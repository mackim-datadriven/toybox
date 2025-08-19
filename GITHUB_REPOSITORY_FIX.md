# Fix: GITHUB_REPOSITORY Environment Variable Parsing Bug

## Issue Summary

When deploying TOYBOX to GitHub Pages via GitHub Actions, specific vendor chunk assets fail to load with MIME type errors. The browser attempts to load JavaScript files from incorrect URLs containing a double path structure.

### Error Symptoms

**Console Errors:**
```
Loading module from "https://isnbh0.github.io/isnbh0/toybox-250729-test1-v2/assets/react-vendor-B4qHMsHt.js" was blocked because of a disallowed MIME type ("text/html").
Loading module from "https://isnbh0.github.io/isnbh0/toybox-250729-test1-v2/assets/mermaid-vendor-CtpL5Koz.js" was blocked because of a disallowed MIME type ("text/html").
Loading module from "https://isnbh0.github.io/isnbh0/toybox-250729-test1-v2/assets/ui-vendor-BAqpK6Hn.js" was blocked because of a disallowed MIME type ("text/html").
```

**Problem Pattern:**
- ❌ **Incorrect URL:** `https://isnbh0.github.io/isnbh0/toybox-250729-test1-v2/assets/...`
- ✅ **Expected URL:** `https://isnbh0.github.io/toybox-250729-test1-v2/assets/...`

Notice the extra `/isnbh0/` in the incorrect URLs.

## Root Cause Analysis

### GitHub Actions Environment Variables

GitHub Actions automatically sets several environment variables, including:
- `GITHUB_REPOSITORY`: Contains the repository name in `owner/repo` format
- For repository `isnbh0/toybox-250729-test1-v2`, this becomes `"isnbh0/toybox-250729-test1-v2"`

### The Bug in vite.config.ts

The problematic code in `vite.config.ts` was:

```javascript
// Override with environment variables if present
if (process.env.GITHUB_REPOSITORY) {
  config.repository = process.env.GITHUB_REPOSITORY;  // ❌ BUG: Uses full "owner/repo"
}

// Compute derived values
config.baseUrl = config.isConfigured ? `/${config.repository}/` : '/';
```

### The Problem Flow

1. **GitHub Actions sets:** `GITHUB_REPOSITORY=isnbh0/toybox-250729-test1-v2`
2. **vite.config.ts reads:** `config.repository = "isnbh0/toybox-250729-test1-v2"` (wrong!)
3. **Base URL calculation:** `config.baseUrl = "/isnbh0/toybox-250729-test1-v2/"` (wrong!)
4. **Vite generates assets with wrong base URL**
5. **Browser tries to load:** `https://isnbh0.github.io/isnbh0/toybox-250729-test1-v2/assets/...`
6. **GitHub Pages returns 404 (HTML) instead of JavaScript**
7. **Browser throws MIME type error**

### Why Only Some Assets Were Affected

The issue specifically affected vendor chunks (`react-vendor`, `mermaid-vendor`, `ui-vendor`) because:
- These are loaded via dynamic imports (code splitting)
- Dynamic imports use the base URL calculated at build time
- Static assets and the main bundle were embedded correctly in the HTML

## The Fix

### Code Changes

**File:** `vite.config.ts`

**Before:**
```javascript
if (process.env.GITHUB_REPOSITORY) {
  config.repository = process.env.GITHUB_REPOSITORY;
}
```

**After:**
```javascript
if (process.env.GITHUB_REPOSITORY) {
  // Extract just the repo name from "owner/repo" format
  config.repository = process.env.GITHUB_REPOSITORY.split('/')[1];
}
```

**Additional TypeScript Fix:**

Added missing properties to the initial config object to resolve TypeScript errors:

```javascript
// Default configuration
let config = {
  username: 'YOUR_GITHUB_USERNAME',
  repository: 'YOUR_REPO_NAME',
  description: 'Configuration for GitHub deployment.',
  customization: {
    siteName: 'TOYBOX',
    siteDescription: 'A collection of Claude-generated artifacts',
    showGitHubLink: true,
    defaultTheme: 'auto'
  },
  isConfigured: false,  // ← Added
  baseUrl: '/'          // ← Added
};
```

## Verification

### Build Output

After the fix, the generated `dist/index.html` shows correct asset paths:

```html
<script type="module" crossorigin src="/toybox-250729-test1-v2/assets/index-B1W5AXQ2.js"></script>
<link rel="modulepreload" crossorigin href="/toybox-250729-test1-v2/assets/react-vendor-B4qHMsHt.js">
<link rel="modulepreload" crossorigin href="/toybox-250729-test1-v2/assets/ui-vendor-BAqpK6Hn.js">
<link rel="modulepreload" crossorigin href="/toybox-250729-test1-v2/assets/mermaid-vendor-CsWEJ88G.js">
```

### Configuration Logic Test

The fix properly handles the `GITHUB_REPOSITORY` environment variable:

- **Input:** `GITHUB_REPOSITORY=isnbh0/toybox-250729-test1-v2`
- **Extracted:** `config.repository = "toybox-250729-test1-v2"`
- **Base URL:** `config.baseUrl = "/toybox-250729-test1-v2/"`

## Impact

### Who This Affects
- Any TOYBOX deployment using GitHub Actions for GitHub Pages
- Repositories where the owner name differs from the repository name
- Dynamic imports and code-split vendor chunks

### What Gets Fixed
- ✅ Vendor chunks load correctly
- ✅ No more MIME type errors
- ✅ JavaScript modules load from correct URLs
- ✅ Application functions normally after deployment

## Testing

### Local Testing
The fix has been tested locally with:
1. `npm run build` - Build completes successfully
2. Generated HTML contains correct asset paths
3. No TypeScript compilation errors

### Deployment Testing
After applying this fix and redeploying via GitHub Actions:
1. Assets should load from correct URLs
2. Console errors should disappear
3. Application should function normally

## Files Modified

1. **`vite.config.ts`**
   - Fixed `GITHUB_REPOSITORY` environment variable parsing
   - Added missing TypeScript property definitions

## Implementation Notes

- The fix is backward compatible - it works in both local development and GitHub Actions
- No changes needed to GitHub Actions workflow files
- No changes needed to existing configuration files
- The fix only affects the build process, not runtime behavior

## Recommendation for Template

This fix should be applied to the upstream TOYBOX template to prevent this issue for all downstream users deploying via GitHub Actions.