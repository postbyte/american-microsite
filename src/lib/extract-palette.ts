interface Bin {
	r: number;
	g: number;
	b: number;
	count: number;
}

function rgbDistance(a: Bin, b: Bin): number {
	const dr = (a.r - b.r) / 255;
	const dg = (a.g - b.g) / 255;
	const db = (a.b - b.b) / 255;
	return Math.sqrt(dr * dr + dg * dg + db * db);
}

function lightness(c: Bin): number {
	return (Math.max(c.r, c.g, c.b) + Math.min(c.r, c.g, c.b)) / 510;
}

function saturation(c: Bin): number {
	const max = Math.max(c.r, c.g, c.b);
	const min = Math.min(c.r, c.g, c.b);
	if (max === 0) return 0;
	return (max - min) / max;
}

function toHex({ r, g, b }: Bin): string {
	return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

/**
 * Samples a loaded <img> down to a 48x48 canvas and buckets pixels into a
 * coarse RGB grid, then picks one representative color per lightness tier
 * (dark / mid / light) so the result spans the image's tonal range instead
 * of returning near-duplicates from whatever cluster is most common.
 */
export function extractPaletteFromImage(img: HTMLImageElement, n = 3): string[] {
	const canvas = document.createElement("canvas");
	canvas.width = 48;
	canvas.height = 48;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("2d context unavailable");
	ctx.drawImage(img, 0, 0, 48, 48);
	const { data } = ctx.getImageData(0, 0, 48, 48);

	const buckets = new Map<number, Bin>();
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i]!;
		const g = data[i + 1]!;
		const b = data[i + 2]!;
		const a = data[i + 3]!;
		if (a < 128) continue;
		const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
		const bucket = buckets.get(key);
		if (bucket) {
			bucket.r += r;
			bucket.g += g;
			bucket.b += b;
			bucket.count++;
		} else {
			buckets.set(key, { r, g, b, count: 1 });
		}
	}

	if (buckets.size === 0) return [];

	const candidates: Bin[] = [...buckets.values()].map((b) => ({
		r: Math.round(b.r / b.count),
		g: Math.round(b.g / b.count),
		b: Math.round(b.b / b.count),
		count: b.count,
	}));

	const tiers: Bin[][] = [[], [], []];
	for (const c of candidates) {
		const l = lightness(c);
		if (l < 0.38) tiers[0]!.push(c);
		else if (l > 0.68) tiers[2]!.push(c);
		else tiers[1]!.push(c);
	}

	for (const tier of tiers) {
		tier.sort((a, b) => b.count * (saturation(b) + 0.2) - a.count * (saturation(a) + 0.2));
	}

	const picked: Bin[] = [];
	for (const tier of tiers) {
		if (tier.length > 0) picked.push(tier[0]!);
	}

	while (picked.length < n) {
		let best: Bin | null = null;
		let bestScore = -Infinity;
		for (const c of candidates) {
			if (picked.includes(c)) continue;
			let minDist = Infinity;
			for (const p of picked) {
				const d = rgbDistance(p, c);
				if (d < minDist) minDist = d;
			}
			const score = minDist + 0.08 * Math.log(c.count + 1);
			if (score > bestScore) {
				bestScore = score;
				best = c;
			}
		}
		if (!best) break;
		picked.push(best);
	}

	return picked.slice(0, n).map(toHex);
}

export function awaitImageLoaded(img: HTMLImageElement): Promise<void> {
	if (img.complete && img.naturalWidth > 0) return Promise.resolve();
	return new Promise((resolve, reject) => {
		const onLoad = () => {
			cleanup();
			resolve();
		};
		const onError = () => {
			cleanup();
			reject(new Error("image load failed"));
		};
		const cleanup = () => {
			img.removeEventListener("load", onLoad);
			img.removeEventListener("error", onError);
		};
		img.addEventListener("load", onLoad, { once: true });
		img.addEventListener("error", onError, { once: true });
	});
}
