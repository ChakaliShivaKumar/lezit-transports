#!/bin/bash

# LEZIT Transports Deployment Script
echo "🚀 Starting LEZIT Transports deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "render.yaml"
    "backend/package.json"
    "frontend/package.json"
    "backend/src/server.ts"
    "frontend/src/App.tsx"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Required file not found: $file"
        exit 1
    fi
done

echo "✅ All required files found"

# Check if .env files are in .gitignore
if grep -q "\.env" .gitignore; then
    echo "✅ .env files are properly ignored"
else
    echo "⚠️  Warning: .env files might not be ignored. Check your .gitignore file."
fi

# Check current git status
echo "📊 Git status:"
git status --porcelain

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them before deploying:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    echo "   git push"
else
    echo "✅ All changes are committed"
fi

echo ""
echo "🎯 Next steps for deployment:"
echo "1. Push your code to GitHub/GitLab:"
echo "   git push origin main"
echo ""
echo "2. Go to Render Dashboard: https://dashboard.render.com/"
echo "3. Click 'New' → 'Blueprint'"
echo "4. Connect your repository"
echo "5. Render will detect the render.yaml file"
echo "6. Click 'Apply' to deploy both services"
echo ""
echo "7. After deployment, set up environment variables in Render dashboard"
echo "8. Update CORS settings if needed"
echo "9. Seed the database using Render shell: npm run seed"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🔗 Useful links:"
echo "- Render Dashboard: https://dashboard.render.com/"
echo "- MongoDB Atlas: https://cloud.mongodb.com/"
echo "- Google OAuth Console: https://console.cloud.google.com/" 