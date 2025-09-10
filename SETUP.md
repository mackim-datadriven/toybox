# TOYBOX Template Setup Guide

This file contains step-by-step instructions for converting the TOYBOX template repository into a personalized instance. This process should be executed by Claude Code when a user requests setup.

## Overview

This setup process will:
1. Verify prerequisites (gh CLI and GitHub authentication)
2. Collect user information (GitHub username and desired repository name)
3. Replace template files with instance versions
4. Configure the project with user-specific details
5. Create a new GitHub repository
6. Configure GitHub Pages deployment
7. Push the personalized code to the new repository
8. Verify deployment setup

## Prerequisites Verification

### Step 1: Check gh CLI Installation

Run the following command to verify gh CLI is installed and get version:
```bash
gh --version
```

Expected: Should return version information. If command fails, stop and provide this message:
> "GitHub CLI (gh) is not installed or not in PATH. Please install GitHub CLI first: https://cli.github.com/ and ensure it's accessible from your terminal."

### Step 2: Verify GitHub Authentication

Run the following command to check authentication status:
```bash
gh auth status
```

Expected: Should show "Logged in to github.com as [username]". If not authenticated, stop and provide this message:
> "You are not logged in to GitHub. Please run 'gh auth login' to authenticate with GitHub first, then try the setup again."

## User Information Collection

### Step 3: Get GitHub Username

Run the following command to get the authenticated user's GitHub username:
```bash
gh api user --jq .login
```

Store the result and confirm with the user:
> "I found your GitHub username as: [username]. Is this correct? (yes/no)"

If user says no, ask them to provide the correct username.

### Step 4: Get Repository Name

Ask the user:
> "What would you like to name your toybox repository? (default: 'toybox')"

If no response or empty, use 'toybox' as the default.

## Template Instance Conversion

### Step 5: Replace Template Files

Check if README.INSTANCE.md exists:
```bash
ls README.INSTANCE.md
```

If it exists:
1. Replace README.md content with README.INSTANCE.md content
2. Delete README.INSTANCE.md

Check if CLAUDE.INSTANCE.md exists:
```bash
ls CLAUDE.INSTANCE.md
```

If it exists:
1. Replace CLAUDE.md content with CLAUDE.INSTANCE.md content  
2. Delete CLAUDE.INSTANCE.md

### Step 6: Update Configuration

Create or update github.config.json with the collected information:
```json
{
  "username": "[collected_username]",
  "repository": "[collected_repo_name]",
  "description": "Configuration for GitHub deployment.",
  "customization": {
    "siteName": "[username]'s Toybox",
    "siteDescription": "My collection of Claude artifacts",
    "showGitHubLink": true,
    "defaultTheme": "auto"
  }
}
```

### Step 7: Apply Configuration Updates

Run the configuration update utility:
```bash
npm run update-config
```

Expected: Should complete without errors. If it fails, check that all files are accessible and try again.

### Step 8: Commit Changes

Add all changes and commit:
```bash
git add github.config.json
git add README.md
git add CLAUDE.md
git add package.json
git add index.html
git add public/404.html
git add src/components/AboutPage.tsx
git add TOYBOX_CONFIG.json
```

Only add files that were modified. Then commit:
```bash
git commit -m "chore: initialize toybox instance for [username]/[repo_name]

- Replace template files with instance versions
- Configure GitHub deployment settings
- Update site metadata and branding

🤖 Generated with Claude Code (https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## GitHub Repository Setup

### Step 9: Create GitHub Repository

First, check the current remote origin (which will likely point to the template repository):
```bash
git remote get-url origin
```

Since the repository already has an origin remote (from cloning the template), we need to remove it before creating the new repository:
```bash
git remote remove origin
```

Now create a new repository using gh CLI:
```bash
gh repo create [username]/[repo_name] --public --description "Personal toybox for Claude artifacts" --source . --push
```

Expected: Should create the repository and add it as the new origin remote, then push the current branch. If this fails with an error about repository already existing, stop and inform the user:
> "A repository named '[repo_name]' already exists in your GitHub account. Please choose a different name or delete the existing repository first."

### Step 10: Configure GitHub Pages

Enable GitHub Pages with Actions as the source:
```bash
gh api repos/[username]/[repo_name]/pages -X POST -f source='{"branch":"main","path":"/"}'
```

If this fails, try the alternative approach:
```bash
gh api repos/[username]/[repo_name]/pages -X POST -f build_type=workflow
```

## Deployment & Verification

### Step 11: Verify Repository Setup

Check that the remote origin is correctly set:
```bash
git remote get-url origin
```

Expected: Should return `https://github.com/[username]/[repo_name].git`

### Step 12: Trigger GitHub Actions

The repository should have a GitHub Actions workflow file at `.github/workflows/deploy.yml`. Verify it exists:
```bash
ls .github/workflows/deploy.yml
```

Push to trigger the workflow:
```bash
git push origin main
```

### Step 13: Check Actions Status

Wait a few seconds, then check if the action started:
```bash
gh run list --limit 1
```

Expected: Should show a workflow run, likely with status "in_progress" or "completed".

Get the workflow URL for the user:
```bash
gh run list --limit 1 --json url --jq '.[0].url'
```

### Step 14: Get Repository and Pages URLs

Get the repository URL:
```bash
echo "https://github.com/[username]/[repo_name]"
```

Get the expected Pages URL:
```bash
echo "https://[username].github.io/[repo_name]/"
```

## Final Steps

### Step 15: Cleanup

If all previous steps completed successfully, remove this setup file:
```bash
rm SETUP.md
git add SETUP.md
git commit -m "chore: remove setup file after successful initialization"
git push origin main
```

### Step 16: Provide User Summary

Inform the user of completion with these details:
> "✅ Setup completed successfully!
> 
> **Your new toybox repository:** https://github.com/[username]/[repo_name]
> **GitHub Actions:** [workflow_url]
> **Your site URL:** https://[username].github.io/[repo_name]/
> 
> The GitHub Actions workflow is building your site now. It may take a few minutes for your site to become available. You can check the progress at the GitHub Actions link above.
> 
> Once the workflow completes successfully, your toybox will be live at the site URL. You can start adding artifacts to the `src/artifacts/` directory!"

## Error Handling

If any step fails:
1. Provide the specific error message to the user
2. Suggest checking the prerequisites again
3. Do not proceed to subsequent steps
4. Leave the repository in a clean state

If GitHub Pages configuration fails:
1. The repository will still be created successfully
2. Inform the user they can manually configure Pages in GitHub repo settings
3. Direct them to: Repository Settings → Pages → Source: "GitHub Actions"

## Additional Notes

- The setup process assumes the template repository is already cloned locally
- All git operations should be performed in the repository root directory
- The process creates a public repository by default
- GitHub Pages may take several minutes to become available after initial setup
- The workflow in `.github/workflows/deploy.yml` should automatically build and deploy the site