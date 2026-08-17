# The American Challenge — Site Content

This file captures all user-facing copy from the microsite in page order. Edit here, then apply changes back to the source files noted at the end.

## Meta

- **Title:** The American Challenge — 30 Days, Built Like Training | Sam
- **Description:** Join student-athletes across the American Conference in a 30-day challenge for the stuff that's actually heavy off the field. Free, private, 2 minutes a day.
- **Keywords:** American Conference student-athlete challenge, Sam, student-athlete mental performance, The American Challenge

## Header Navigation

- How it works
- For FARs
- For SAAC
- More
- CTA button: Sign Up

## Hero

- Eyebrow: The American Challenge
- H1: Your best semester yet
- Subhead: Mental Performance Coaching for on and off the field.
- CTA button: Sign Your School Up (links to `#final`)
- Microcopy under CTA: This is more than sports, this is about you.

## Hero Photo Band / Day Cards Carousel

- Overlay heading: This is what a month of locking in looks like.

Chat-style quote/reply pairs (24 total):

1. "Supposed to meet my profs. No idea what to say." → "Bank the goodwill now, before the first travel week hits."
2. "I don't even know where the syllabus is." → "Find the four things in there that actually decide your grade."
3. *(remaining 22 pairs live in `src/collections/challenge.json` → `dayCards`; edit there for the full list)*

## Proof Strip

- 15 — American Conference schools
- 30 — days, one challenge a day
- 2 min — a check-in
- $1,500 — to the winning SAAC

## Six Things Actually Worth Training For

- Section title: Six things actually worth training for.
- Section description: Every challenge maps to one of these. None of them are about being fixed.

1. **Compete like it's already happening** — Confidence check-ins built for wherever your season actually is right now.
   Example: Identify one thing that's working and one thing that's getting in the way this week, not last year.
2. **Run your scouting report** — Introduce yourself to a professor. Book the advisor meeting. Know the week before it hits you.
3. **Recruit yourself for what's next** — A 30-second pitch that never mentions your sport. One message to someone whose work you're curious about.
4. **Build your locker room** — Meet an athlete from another team. Welcome the freshman who just got here.
5. **Recover like it's part of training** — Find your sports psych. Eat the third meal. Name the skill you give your team.
6. **Sleep like it's part of training** — Lay tomorrow out tonight. Swap ten minutes of scrolling for a brain-dump.

## How It Works

- Section title: How it works.

1. **Download Sam.** — Free for American Conference student-athletes.
2. **Take on one challenge a day.** — September 8 to October 8. Sleep, confidence, classes, your role on the team, what comes after sport.
3. **Every check-in counts.** — Daily participation earns your school credit toward the leaderboard.

## Leaderboard Panel (navy)

- H2: Your school is in a race.
- Body: Every check-in is a point for your school. The school that participates the most wins $1,500 for its SAAC. You don't need your whole team to sign up to start climbing — but it helps. Go recruit.
- CTA button: Check the Leaderboard (links to `#leaderboard`)
- Leaderboard rows *(placeholder data — not final copy)*: "[School Name]" x5 with points (2,140 / 1,860 / 1,705 / 1,522 / 1,340 pts)

## Built To Actually Listen

- Section title: Built to actually listen.
- Section description: Most advice hands you a checklist before it knows what's wrong. Sam asks what's actually going on first and what's actually eating at you. That's where the real conversations start. That's not a script. That's what a good conversation with someone who's paying attention sounds like.

  > Note: source copy currently reads "That where the real conversations start" — likely a typo for "That's where."

**The old way:**
- Try a gratitude journal
- Set a morning routine
- Talk to someone if you need it
- Practice visualization
- Get 8 hours of sleep
- Stay positive

**Sam:**
- "What's actually eating at you today?"

## Outcome Stats

- Section title: Sam's already working for student-athletes.
- 73% — Said they felt more confident handling what's hard — in life, sport, and class.
- 71% — Said they reached out to the people in their lives more.
- 68% — Made a real change, a new routine, a different way of prepping.
- 40%→4% — Drop in career confusion among athletes who used it.

## Testimonials Carousel

- Section title: From athletes who've used it.

1. "It didn't hand me a script. It asked what being on the bench was actually like — and that's when I actually started talking."
2. "It helped me find the words to bring something up with my coach that I'd been sitting on for weeks."
3. "I stopped measuring my timeline against everyone else's and started figuring out what I actually wanted next."
4. "Five minutes, right after practice, before I forget what actually happened — that's when it works."

- Carousel button labels (accessibility): Previous testimonial / Next testimonial

## Privacy Panel (navy)

- H2: Private by design.
- Body: What you tell Sam stays with Sam, unless you choose to share it. No coach sees your check-ins. No default reporting to your athletic department. Disclosure happens when you decide it should — not before. Sam is not therapy, and it always says so plainly.

## FAQ

- Section title: Questions.

**Is this therapy?**
No. Sam is a daily conversation, not clinical care — and it'll point you to real support when something needs more than a conversation can give.

**Will my coach see what I say?**
No. Private by default. You choose what, if anything, gets shared.

**What if I miss a day?**
Nothing happens. Jump back in whenever — there's no penalty and no guilt trip.

**Does my whole team have to sign up for it to count?**
No. Any American Conference student-athlete can join on their own, and every check-in still counts toward your school's total.

**What happens after day 30?**
Powerful Minds Week follows immediately — a week built for reflection, not an ending.

## Final CTA Panel (navy)

- H2: 30 days. Whenever you're ready.
- Body: Early access opens August 18. The challenge runs September 8 – October 8.
- CTA button: Sign Your School Up (links to `#final`)

## Footer

- Tagline: Sam is built by Journai. This program is supported by the American Conference Academic Consortium Grant.

**Program**
- How it works
- The Challenges
- Leaderboard
- FAQ

**For staff**
- Privacy
- For SAAC Reps
- For FARs
- For Athletic Directors

---

## Source files (apply edits back here)

- `src/pages/index.astro` — hero, section headings/descriptions, and one-off CTA/body copy (inline)
- `src/collections/challenge.json` — day cards, proof stats, six jobs, how-it-works steps, leaderboard rows, "old way" list, outcome stats, testimonials, FAQ, footer links
- `src/collections/menu.json` — header nav labels
- `src/components/sections/Header.astro` — "Sign Up" CTA button
- `src/components/sections/Footer.astro` — footer tagline
