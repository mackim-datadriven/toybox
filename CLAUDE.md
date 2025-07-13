# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TOYBOX template - a React-based portfolio/gallery application for showcasing Claude-generated artifacts. It's designed to be deployed to GitHub Pages and serves as a template for creating personal artifact collections.

## Architecture

**Frontend Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Tailwind CSS for styling
- shadcn/ui component library (Radix UI primitives)
- React Router for navigation

**Artifact System:**
- Artifacts are stored in `src/artifacts/` as `.tsx` files or in subdirectories with `index.tsx`
- Static imports via Vite's `import.meta.glob()` for automatic discovery
- Support for React, SVG, and Mermaid diagram types
- Metadata defined within each artifact file

**Key Components:**
- `ArtifactLoader` (`src/lib/artifactLoader.ts`): Core system for discovering and loading artifacts
- `ArtifactRunner` (`src/components/ArtifactRunner.tsx`): Renders individual artifacts
- `ArtifactGallery` (`src/components/ArtifactGallery.tsx`): Main gallery view
- UI components in `src/components/ui/`: shadcn/ui component library

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Test production build with base path
npm run test-production
```

## Configuration

**TOYBOX_CONFIG.json**: Site configuration (title, description, theme, layout)
**components.json**: shadcn/ui configuration
**vite.config.ts**: Build configuration with GitHub Pages support

## Path Resolution

- `@/` and `src/` aliases resolve to `./src/`
- Base path handling for GitHub Pages deployment (set to `/YOUR_REPO_NAME/` in production)

## Artifact Development

Create new artifacts in `src/artifacts/`:
- Direct files: `src/artifacts/my-artifact.tsx`
- Subdirectories: `src/artifacts/my-artifact/index.tsx`

Each artifact should export metadata and a default React component.

## Build System

Vite handles:
- Asset optimization and chunking
- TypeScript compilation
- CSS processing with Tailwind and PostCSS
- Source map generation
- GitHub Pages deployment preparation