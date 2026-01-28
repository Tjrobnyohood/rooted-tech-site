#!/bin/bash

# Rooted Tech Services - Deployment Script
# This script automates the deployment process to GitHub Pages

echo "🚀 Rooted Tech Services - Deployment Script"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Ask for repository name
read -p "Enter repository name (default: rootedtech-website): " REPO_NAME
REPO_NAME=${REPO_NAME:-rootedtech-website}

# Ask if using is-a.dev
read -p "Are you deploying to is-a.dev? (y/n): " USE_ISA_DEV

# Create git repository if it doesn't exist
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Rooted Tech Services website"
    git branch -M main
    echo "✅ Repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Add remote if not exists
if ! git remote get-url origin &> /dev/null; then
    REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    echo "🔗 Adding remote: ${REPO_URL}"
    git remote add origin ${REPO_URL}
    
    echo ""
    echo "⚠️  Please create the repository on GitHub first:"
    echo "   1. Go to: https://github.com/new"
    echo "   2. Repository name: ${REPO_NAME}"
    echo "   3. Make it Public"
    echo "   4. Click 'Create repository'"
    echo ""
    read -p "Press Enter after creating the repository..."
    
    git push -u origin main
else
    echo "ℹ️  Remote already exists"
    git push origin main
fi

# Get GitHub Pages URL
if [ "$USE_ISA_DEV" = "y" ] || [ "$USE_ISA_DEV" = "Y" ]; then
    echo ""
    echo "📋 is-a.dev Configuration"
    echo "=========================================="
    echo ""
    echo "Next steps for is-a.dev:"
    echo "1. Fork the is-a.dev repository: https://github.com/is-a-dev/register"
    echo "2. Create file: domains/rootedtech.json"
    echo "3. Add this content:"
    echo ""
    echo '{'
    echo '  "owner": {'
    echo "    &quot;username&quot;: &quot;${GITHUB_USERNAME}&quot;,"
    echo '    "email": "tjrob0110@proton.me"'
    echo '  },'
    echo '  "record": {'
    echo "    &quot;CNAME&quot;: &quot;${GITHUB_USERNAME}.github.io&quot;"
    echo '  }'
    echo '}'
    echo ""
    echo "4. Submit a pull request to is-a-dev"
    echo ""
    echo "Your site will be available at: https://rootedtech.is-a.dev"
else
    echo ""
    echo "✅ Deployment Complete!"
    echo "=========================================="
    echo ""
    echo "Your site is now available at:"
    echo "🌐 https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
    echo "2. Enable GitHub Pages (if not already enabled)"
    echo "3. Source: Deploy from a branch"
    echo "4. Branch: main → / (root)"
    echo "5. Click Save"
    echo ""
    echo "Wait 1-2 minutes for GitHub to build your site!"
fi

echo ""
echo "🎉 Happy Deploying!"