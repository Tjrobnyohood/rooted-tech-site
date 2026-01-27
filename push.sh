#!/bin/bash

# Navigate to your project folder (if not already there)
# cd ~/alternate

# Add all changes
git add .

# Prompt for a commit message (or use a default)
read -p "Enter commit message: " msg
if [ -z "$msg" ]; then
  msg="Update Strong Tower Assets: $(date +'%Y-%m-%d %H:%M')"
fi

# Commit and Push
git commit -m "$msg"
git push origin main

echo "------------------------------------"
echo "✅ Strong Tower Update Deployed!"
echo "------------------------------------"
