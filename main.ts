// Dad Joke Showdown — u-mfnakmal-dad-joke-showdown-1d2ce3e5
//
// The entry is one dad joke, at most 200 characters, written to
// /output/entry.txt. The joke must read like something a father would
// actually say out loud across the dinner table: a clean pun, a clear
// setup, and the payoff landing on the very last words.
//
// Chosen joke (75 characters):
//   "I named my dog Five Miles so I can tell people I walk Five Miles every day."
//
// Why this one won the brainstorm (20+ candidates, scored pairwise
// against the judge's criteria, most important first):
//   1. Unmistakably a dad joke: a father boasting about his daily walk.
//   2. The pun lands on the first read — "Five Miles" is both the
//      dog's name and the distance, so the boast is literally true.
//   3. Fresh but inside the tradition: the name-a-pet-after-a-phrase
//      shape is classic dad-joke territory, yet this exact joke is
//      not one of the thousand-times-told ones (no scarecrow, no
//      "Hi hungry, I'm Dad", no coffee getting mugged).
//   4. Tight: every word earns its place and the punchline — the
//      daily walk — arrives at the very end.
//   5. Reads aloud naturally, with a rhythm a father could deliver
//      while passing the potatoes.
//
// The program is fully deterministic: the same joke, byte for byte,
// on every run. No input is read, no network is used, and nothing
// outside this file affects the output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The single dad joke that is the whole entry.
const JOKE =
  "I named my dog Five Miles so I can tell people I walk Five Miles every day.";

// The grader's output path. Defaults to /output/entry.txt; an
// OUTPUT_PATH override exists only so the same program can be run
// locally against a scratch directory without touching /output.
const OUTPUT_PATH =
  process.env.OUTPUT_PATH ?? join("/", "output", "entry.txt");

function main(): void {
  // Count characters as code points, not UTF-16 units, so the
  // 200-character gate is measured the way a reader counts it.
  // The joke must fit the cap, and it must not be empty or only
  // whitespace — check before writing anything.
  const length = [...JOKE].length;
  if (length === 0 || length > 200 || JOKE.trim().length === 0) {
    throw new Error(`joke must be 1-200 characters, got ${length}`);
  }
  // The punchline must land at the very end: the joke has to close
  // on a full stop, not trail off mid-sentence.
  if (!JOKE.endsWith(".")) {
    throw new Error("joke must end with a full stop");
  }

  // Make sure the output directory exists, then write the joke
  // exactly as-is: no trailing newline, no extra whitespace, so the
  // file holds one dad joke and nothing else.
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf8");

  // Read the file back and confirm it holds exactly the joke we
  // meant to write — a silent wrong write is worse than a loud one.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== JOKE) {
    throw new Error("entry.txt does not match the joke");
  }
  console.log(`wrote ${length} characters to ${OUTPUT_PATH}`);
}

main();
