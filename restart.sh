#!/bin/bash

PROJECT="$HOME/Documents/Personal/Website/Code"

echo "[+] Stopping Sandheep's Website development processes..."

# Graceful termination
pkill -TERM -f "$PROJECT" 2>/dev/null

sleep 3

# Check what's left
REMAINING=$(pgrep -af "$PROJECT" || true)

if [ -n "$REMAINING" ]; then
    echo
    echo "[+] Some processes did not stop gracefully:"
    echo "$REMAINING"
    echo
    echo "[+] Force stopping them..."

    pkill -KILL -f "$PROJECT" 2>/dev/null
    sleep 1
fi

# Final verification
REMAINING=$(pgrep -af "$PROJECT" || true)

if [ -n "$REMAINING" ]; then
    echo "[+] WARNING: processes still remain:"
    echo "$REMAINING"
else
    echo "[+] ✓ All processes stopped."
fi


sleep 5

echo "[+] Starting server"
fuser -k 3000/tcp

npm run dev
