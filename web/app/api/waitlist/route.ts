import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { NextResponse } from "next/server"

const DATA_PATH = join(process.cwd(), ".data", "waitlist.json")
const BASELINE_COUNT = 1847

type WaitlistEntry = {
  email: string
  createdAt: string
}

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeEntries(entries: WaitlistEntry[]) {
  await mkdir(dirname(DATA_PATH), { recursive: true })
  await writeFile(DATA_PATH, JSON.stringify(entries, null, 2))
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : ""
}

export async function GET() {
  const entries = await readEntries()
  return NextResponse.json({ count: BASELINE_COUNT + entries.length })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = normalizeEmail(body?.email)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 })
  }

  const entries = await readEntries()
  const existingIndex = entries.findIndex((entry) => entry.email === email)

  if (existingIndex >= 0) {
    const position = BASELINE_COUNT + existingIndex + 1
    return NextResponse.json({
      already: true,
      position,
      totalCount: BASELINE_COUNT + entries.length,
    })
  }

  entries.push({ email, createdAt: new Date().toISOString() })
  await writeEntries(entries)

  return NextResponse.json({
    position: BASELINE_COUNT + entries.length,
    totalCount: BASELINE_COUNT + entries.length,
  })
}
