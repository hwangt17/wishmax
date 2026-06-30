#!/usr/bin/env bash
# Ralph Wiggum - PRD-driven agent loop for Wishmax
# Usage:
#   ./ralph.sh --tool claude [max_iterations]
#   ./ralph.sh --tool claude --stop-at US-001

set -euo pipefail

TOOL="claude"
MAX_ITERATIONS=10
STOP_AT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    --tool=*)
      TOOL="${1#*=}"
      shift
      ;;
    --stop-at)
      STOP_AT="$2"
      shift 2
      ;;
    --stop-at=*)
      STOP_AT="${1#*=}"
      shift
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_ITERATIONS="$1"
      fi
      shift
      ;;
  esac
done

if [[ "$TOOL" != "claude" && "$TOOL" != "amp" ]]; then
  echo "Error: Invalid tool '$TOOL'. Must be 'claude' or 'amp'."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRD_FILE="$SCRIPT_DIR/prd.json"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"
CHECKLIST_FILE="$SCRIPT_DIR/checklist.md"
ARCHIVE_DIR="$SCRIPT_DIR/archive"
LAST_BRANCH_FILE="$SCRIPT_DIR/.last-branch"

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required."
  exit 1
fi

if [[ ! -f "$PRD_FILE" ]]; then
  echo "Error: Missing prd.json."
  exit 1
fi

CURRENT_BRANCH="$(jq -r '.branchName // empty' "$PRD_FILE")"
if [[ -z "$CURRENT_BRANCH" ]]; then
  echo "Error: prd.json must include branchName."
  exit 1
fi

if [[ -f "$LAST_BRANCH_FILE" ]]; then
  LAST_BRANCH="$(cat "$LAST_BRANCH_FILE" 2>/dev/null || true)"
  if [[ -n "$LAST_BRANCH" && "$LAST_BRANCH" != "$CURRENT_BRANCH" ]]; then
    DATE="$(date +%Y-%m-%d)"
    FOLDER_NAME="$(echo "$LAST_BRANCH" | sed 's|^ralph/||')"
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"

    echo "Archiving previous run: $LAST_BRANCH"
    mkdir -p "$ARCHIVE_FOLDER"
    [[ -f "$PRD_FILE" ]] && cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
    [[ -f "$PROGRESS_FILE" ]] && cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
    [[ -f "$CHECKLIST_FILE" ]] && cp "$CHECKLIST_FILE" "$ARCHIVE_FOLDER/"

    LINE_COUNT="$(wc -l < "$PROGRESS_FILE" 2>/dev/null || echo 0)"
    if [[ "$LINE_COUNT" -lt 5 ]]; then
      {
        echo "# Ralph Progress Log"
        echo
        echo "Started: $(date)"
        echo
        echo "## Codebase Patterns"
        echo "- No durable patterns recorded yet."
      } > "$PROGRESS_FILE"
    else
      echo "Preserving existing progress.txt ($LINE_COUNT lines)."
    fi

    [[ -f "$CHECKLIST_FILE" ]] && rm "$CHECKLIST_FILE"
  fi
fi

echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE"

if [[ ! -f "$PROGRESS_FILE" ]]; then
  {
    echo "# Ralph Progress Log"
    echo
    echo "Started: $(date)"
    echo
    echo "## Codebase Patterns"
    echo "- No durable patterns recorded yet."
  } > "$PROGRESS_FILE"
fi

if [[ -n "$STOP_AT" ]]; then
  echo "Starting Ralph - Tool: $TOOL - Max iterations: $MAX_ITERATIONS - Stop at: $STOP_AT"
else
  echo "Starting Ralph - Tool: $TOOL - Max iterations: $MAX_ITERATIONS"
fi

for i in $(seq 1 "$MAX_ITERATIONS"); do
  echo
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($TOOL)"
  echo "==============================================================="

  if [[ "$TOOL" == "amp" ]]; then
    OUTPUT="$(amp --dangerously-allow-all < "$SCRIPT_DIR/prompt.md" 2>&1 | tee /dev/stderr)" || true
  else
    OUTPUT="$(claude --dangerously-skip-permissions --print < "$SCRIPT_DIR/CLAUDE.md" 2>&1 | tee /dev/stderr)" || true
  fi

  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo
    echo "Ralph completed all tasks."
    echo "Completed at iteration $i of $MAX_ITERATIONS."
    exit 0
  fi

  if [[ -n "$STOP_AT" ]]; then
    STOP_STORY_PASSES="$(jq -r --arg id "$STOP_AT" '.userStories[] | select(.id == $id) | .passes' "$PRD_FILE" 2>/dev/null || echo false)"
    if [[ "$STOP_STORY_PASSES" == "true" ]]; then
      echo
      echo "Ralph reached stop point: $STOP_AT"
      echo "Stopped at iteration $i of $MAX_ITERATIONS."
      exit 0
    fi
  fi

  echo "Iteration $i complete. Continuing..."
  sleep 2
done

echo
echo "Ralph reached max iterations ($MAX_ITERATIONS) without completing all tasks."
echo "Check $PROGRESS_FILE for status."
exit 1
