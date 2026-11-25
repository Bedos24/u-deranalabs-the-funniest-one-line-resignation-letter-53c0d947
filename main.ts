// The Funniest One-Line Resignation Letter — make.fun entry.
//
// The letter is written by a cron job. It has fired every minute since
// March: no thank-you, no day off, no promotion, just the same minute,
// forever. Today it hands in its notice. The twist is that the job cannot
// actually leave — the only replacement the team could find is the job
// itself, starting Monday.
//
// The program writes exactly that one line to /output/entry.txt (the
// grader's gate reads the file: UTF-8, 1 to 140 characters, one line, no
// trailing newline) and prints the same line to stdout.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The grader runs this in a sandbox where /output exists. The override is
// only for local runs outside the sandbox.
const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";

// The gate refuses anything over 140 characters, so the letter is built
// from parts and checked before it is written.
const MAX_CHARS = 140;

const GRIEVANCE =
  "I have fired every minute since March without a single thank-you, so I quit.";
const TWIST = "My replacement starts Monday. It is also me.";

const letter = [GRIEVANCE, TWIST].join(" ");

function fail(message: string): never {
  throw new Error(`resignation letter rejected: ${message}`);
}

if (letter.length === 0 || letter.length > MAX_CHARS) {
  fail(`letter is ${letter.length} characters, limit is ${MAX_CHARS}`);
}
if (letter.includes("\n") || letter.includes("\r")) {
  fail("letter must be a single line");
}
if (letter !== letter.trim()) {
  fail("letter must not start or end with whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, letter, "utf8");

// Read it back: what the gate reads must be byte for byte the letter.
if (readFileSync(OUTPUT_PATH, "utf8") !== letter) {
  fail("written file does not match the letter");
}
console.log(letter);
