/*
 * Waitlist store — the SINGLE seam every caller uses to persist a signup.
 *
 * SERVER-ONLY (uses node:fs). Only the route handler imports this; never a
 * client component.
 *
 * v1 placeholder implementation: append newline-delimited JSON (JSONL) to a
 * local, git-ignored file. This is a deliberate, documented stand-in for a real
 * provider — an email audience (Resend / ConvertKit / Loops), a hosted DB, etc.
 *
 * To go live, replace ONLY the body of `saveWaitlistEmail`. Its signature is the
 * contract; the route handler and any other caller stay untouched.
 *
 * NOTE: on ephemeral/serverless filesystems the JSONL file is not durable across
 * deploys/instances — acceptable for a pre-launch placeholder, and exactly why
 * the real provider swaps in behind this same function at launch.
 */
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export interface WaitlistEntry {
  /** Normalized (trimmed + lowercased) email. */
  email: string;
  /** Where the signup originated, for later attribution. */
  source: string;
  /** ISO-8601 timestamp of capture. */
  createdAt: string;
}

const DATA_DIR = join(process.cwd(), ".waitlist-data");
const DATA_FILE = join(DATA_DIR, "waitlist.jsonl");

export async function saveWaitlistEmail(entry: WaitlistEntry): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, `${JSON.stringify(entry)}\n`, "utf8");
}
