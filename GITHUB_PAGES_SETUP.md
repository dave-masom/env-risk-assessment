# GitHub Pages Setup Guide

Follow these steps to publish your Environmental Risk Analyzer to GitHub Pages:

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Fill in the details:
   - **Repository name**: `dew-point-calculator` (or your preferred name)
   - **Description**: "Material-specific environmental risk assessment tool for museum, library, and archive collections"
   - **Visibility**: Select **Public** (required for free GitHub Pages)
   - **Initialize**: Leave all checkboxes unchecked (we already have files)
3. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you some quick setup commands. Run these in your terminal:

```bash
cd /Users/davemasom/Documents/dew-point-calculator

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dew-point-calculator.git

# Ensure you're on the main branch
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Example** (if your username is `johndoe`):
```bash
git remote add origin https://github.com/johndoe/dew-point-calculator.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/dew-point-calculator`
2. Click on **"Settings"** (top right, next to About)
3. In the left sidebar, scroll down and click **"Pages"**
4. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**

## Step 4: Wait for Deployment

- GitHub Pages will take 1-3 minutes to build and deploy your site
- You'll see a message saying "Your site is ready to be published at..."
- When it's done, the message will change to "Your site is live at..."

## Step 5: Access Your Published Site

Your calculator will be available at:
```
https://YOUR_USERNAME.github.io/dew-point-calculator/
```

**Example**: If your username is `johndoe`:
```
https://johndoe.github.io/dew-point-calculator/
```

## Step 6: Update the README

1. Edit `README.md` and replace `YOUR_USERNAME` with your actual GitHub username
2. Commit and push the change:

```bash
git add README.md
git commit -m "Update README with actual GitHub Pages URL"
git push
```

## Troubleshooting

### Site not loading?
- Wait a few minutes - initial deployment can take up to 10 minutes
- Check that you selected "main" branch in Pages settings
- Verify the `.nojekyll` file exists in your repository

### 404 Error?
- Make sure the repository is **Public**
- Check the branch name is exactly "main"
- Verify GitHub Pages is enabled in Settings > Pages

### Changes not showing?
- GitHub Pages caches content - wait 1-2 minutes after pushing
- Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache

## Updating Your Published Site

Whenever you make changes to your code:

```bash
# Make your changes to the files
# Then commit and push

git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages will automatically rebuild and deploy your updated site within 1-2 minutes.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to Settings > Pages
2. Under "Custom domain", enter your domain (e.g., `calculator.example.com`)
3. Add DNS records as instructed by GitHub
4. Wait for DNS propagation (can take 24-48 hours)

## Features Included

Your published site includes:
- ✅ Secure (HTTPS automatically enabled)
- ✅ WCAG 2.1 AA accessible
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ XSS protection
- ✅ Input validation
- ✅ Error handling
- ✅ SEO optimized (meta description included)

## Monitoring

To see your site's traffic:
1. Go to repository Settings > Pages
2. You can connect Google Analytics if desired
3. GitHub provides basic traffic stats in the "Insights" tab

## Next Steps

- Share your calculator URL with colleagues
- Tweet about it with hashtag #DigitalPreservation
- Submit to relevant directories or professional organizations
- Consider adding a feedback form
- Monitor for issues via GitHub Issues tab

---

**Need Help?**
- GitHub Pages Documentation: https://docs.github.com/en/pages
- GitHub Support: https://support.github.com/

**Questions?**
Open an issue on your repository and tag it with `question`.
