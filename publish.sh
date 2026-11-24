#!/bin/sh

# 1. Exit immediately if any command fails
set -e

# 2. Check if required arguments are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "[-] Error: Missing arguments."
    echo "Usage: ./publish.sh <branch-name> \"<commit-message>\""
    exit 1
fi

BRANCH_NAME=$1
COMMIT_MESSAGE=$2

# 3. Verify if the local or remote branch actually exists
if ! git show-ref --verify --quiet "refs/heads/$BRANCH_NAME" && \
   ! git show-ref --verify --quiet "refs/remotes/origin/$BRANCH_NAME"; then
    echo "[-] Error: Branch '$BRANCH_NAME' does not exist locally or on remote origin."
    exit 1
fi

echo "[+] Switching to branch $BRANCH_NAME"
git checkout "$BRANCH_NAME"
echo "[+] In branch $BRANCH_NAME"

echo "[+] Staging changes..."
git add . 

# 4. Safely commit (handles cases where there is nothing to commit)
echo "[+] Committing changes..."
if git diff-index --quiet HEAD --; then
    echo "[!] No changes detected. Skipping commit."
else
    git commit -m "$COMMIT_MESSAGE"
fi

echo "[+] Pushing to origin $BRANCH_NAME..."
git push origin "$BRANCH_NAME"

echo "[+] Triggering Firebase App Hosting rollout..."
# Give GitHub and Google Developer Connect a moment to propagate git refs
sleep 3

RETRY_COUNT=0
MAX_RETRIES=25
until firebase apphosting:rollouts:create studio --git-branch "$BRANCH_NAME" --force; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "[-] Max retries reached. Rollout failed."
        exit 1
    fi
    echo "[!] Build queue busy (HTTP 409 or transient response). Retrying in 20 seconds (attempt $RETRY_COUNT/$MAX_RETRIES)..."
    sleep 20
done

echo "[+] Deployment completed successfully!"


