import { MeshGradient } from "@mesh-gradient/core";
import type { MeshGradientInitOptions, MeshGradientOptions } from "@mesh-gradient/core";
import { awaitImageLoaded, extractPaletteFromImage } from "./extract-palette";

type InitOpts = MeshGradientOptions & MeshGradientInitOptions;

// If a cover-derived color is darker than minLightness (HSL L), mix it toward
// white. Keeps the gradient from absorbing hard shadows or near-black tones
// that would muddy the light-blue page wash.
function lightenIfDark(hex: string, minLightness = 0.72): string {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const L = (Math.max(r, g, b) + Math.min(r, g, b)) / 510;
	if (L >= minLightness) return hex;
	const t = Math.min(1, (minLightness - L) / minLightness);
	const lr = Math.round(r + (255 - r) * t);
	const lg = Math.round(g + (255 - g) * t);
	const lb = Math.round(b + (255 - b) * t);
	return "#" + [lr, lg, lb].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function readHexVar(name: string, fallback: string): string {
	if (typeof document === "undefined") return fallback;
	const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	return v.startsWith("#") ? v : fallback;
}

// Stable per-page seed (FNV-1a over the pathname) so a given page's gradient
// keeps the same overall shape across reloads, then nudged by a small random
// offset so it isn't pixel-identical every visit.
function seedFromPathname(pathname: string): number {
	let h = 2166136261;
	for (let i = 0; i < pathname.length; i++) {
		h = (h ^ pathname.charCodeAt(i)) * 16777619;
	}
	return Math.abs(h % 100000) / 1000;
}

export async function initPageGradient(canvas: HTMLCanvasElement): Promise<void> {
	const baseSeed = seedFromPathname(window.location.pathname);
	const seed = (baseSeed + Math.random() * 6) % 100;

	const baseOpts: InitOpts = {
		seed,
		isStatic: false,
		// Crawl. The blobs drift slowly enough to read as ambient atmosphere
		// rather than animation. The lib's default is 1.0; 0.12 is close to a
		// tenth of that.
		animationSpeed: 0.12,
		// Lower-frequency noise = larger, slower-moving color masses. The lib
		// defaults are { x: 0.00014, y: 0.00029, delta: 0.0001 }.
		frequency: { x: 0.00008, y: 0.00018, delta: 0.00005 },
		appearance: "default",
	};

	const gradient = new MeshGradient();

	// Paint immediately with the theme's CSS-vars palette so the canvas isn't
	// blank while we wait for the hero photo (if any) to load.
	gradient.init(canvas, {
		...baseOpts,
		cssVariablesFallback: true,
	});

	const stage = canvas.closest<HTMLElement>("[data-gradient-stage]");
	if (stage) {
		requestAnimationFrame(() => {
			stage.dataset.ready = "";
		});
	}

	const img = document.querySelector<HTMLImageElement>("[data-hero-cover]");
	if (!img) return;

	let palette: string[] = [];
	try {
		await awaitImageLoaded(img);
		palette = extractPaletteFromImage(img, 3);
	} catch {
		return;
	}
	if (palette.length < 3) return;

	// Cover-derived palette + theme base for the fourth slot. Fade across to
	// it via the lib's built-in transition rather than hard-swapping.
	const themeBase = readHexVar("--mesh-gradient-color-4", "#e2e8f0");
	gradient.update({
		colors: [
			lightenIfDark(palette[0]!),
			lightenIfDark(palette[1]!),
			lightenIfDark(palette[2]!),
			themeBase,
		] as unknown as MeshGradientOptions["colors"],
		transition: true,
		transitionDuration: 800,
	});
}
