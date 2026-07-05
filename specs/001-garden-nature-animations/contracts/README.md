# Contracts: Garden Nature Animations

**Phase**: 1 — Design & Contracts

**Date**: 2026-07-05

This is a frontend-only static website — there are no external API, CLI, or service interfaces. The "contracts" below document the internal module boundaries:

1. **CSS Class Contract** — CSS class names and custom properties that HTML/JS depend on
2. **JS Spawner Contract** — JavaScript functions that manage animated elements
3. **SVG Contract** — Inline SVG shapes used for birds and decorations

---

## 1. CSS Class Contract

| Class/Selector | Purpose | Used By | Type |
|----------------|---------|---------|------|
| `.garden-branch` | Animated branch container | HTML (added to body or section) | CSS `@keyframes` |
| `.bird` | Bird silhouette container | JS spawner (dynamically created) | CSS `@keyframes` |
| `.garden-side` | Garden side decoration layer | HTML (added alongside `.side-decor`) | CSS `@keyframes` |
| `.garden-leaf` | Individual leaf decoration | Inside `.garden-side` | CSS pseudo-element |
| `--green-sage` | Soft sage green (#8a9a6e) | All garden elements | CSS variable |
| `--green-moss` | Moss green (#7a8c62) | Branch/stem elements | CSS variable |
| `--green-pale` | Pale sage (#c7d9b7) | Leaf/flower elements | CSS variable |

All animations use only `transform` and `opacity` properties.

## 2. JS Spawner Contract

```javascript
// Spawns bird elements at intervals
// Returns: interval ID (for cleanup)
function spawnBirds(): number

// Spawns a single bird with random parameters
// Called internally by spawnBirds
function createBird(): void

// Generates inline SVG bird silhouette markup
// Returns: SVG string
function birdSvg(): string

// Cleans up all spawned birds
function clearBirds(): void
```

## 3. SVG Contract

### Bird Silhouette

```svg
<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Simple flying bird silhouette -->
  <path d="M5 25 Q20 5 30 18 Q40 5 55 25 Q40 22 30 28 Q20 22 5 25Z"
        fill="currentColor" />
</svg>
```

The bird SVG is a minimal two-wing silhouette. The color is inherited via `currentColor` to match the garden green palette.

## Validation

All contracts are validated by:
- Visual inspection in browser DevTools
- Absence of JS console errors
- CSS animations rendering at expected frame rate
