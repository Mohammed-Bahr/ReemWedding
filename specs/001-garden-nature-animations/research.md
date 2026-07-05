# Research: Garden Nature Animations

**Phase**: 0 — Outline & Research

**Date**: 2026-07-05

**Source spec**: [spec.md](spec.md)

## Overview

No NEEDS CLARIFICATION markers existed in the feature spec. This research document records the design decisions made by examining the existing codebase (`index.html`, `style.css`, `script.js`) to ensure the implementation aligns with existing patterns.

## Design Decisions

### Decision 1: Branch Implementation Approach

| Item | Detail |
|------|--------|
| **Decision** | CSS-drawn branches using `::before`/`::after` pseudo-elements with `border-radius` and `background` gradients, animated with `@keyframes` sway |
| **Rationale** | The project already uses CSS-only decorative elements (gold side ornaments via SVG `<pattern>`, geometric background pattern via `body::before`). Following the same approach keeps consistency and avoids additional DOM nodes for purely visual elements. |
| **Alternatives Considered** | Inline SVG branches, JS-generated canvas branches, external image files |

### Decision 2: Bird Animation Approach

| Item | Detail |
|------|--------|
| **Decision** | JavaScript-spawned div elements containing inline SVG bird silhouettes, animated via CSS `@keyframes` with randomized parameters (delay, duration, start position, flight curvature) |
| **Rationale** | The existing code already uses JS to spawn particles and petals (`script.js` lines 54–85). Birds follow the same spawner pattern: `setInterval` creates elements, CSS animates them, `setTimeout` removes them. No external assets needed. |
| **Alternatives Considered** | Pure CSS birds, sprite sheet images, Lottie animations, Canvas 2D |

### Decision 3: Garden Side Decorations Approach

| Item | Detail |
|------|--------|
| **Decision** | Extend the existing `.side-decor` pattern (fixed position divs on left/right) with additional garden-themed SVG patterns (leaves, vines) layered behind or alongside the existing gold ornaments |
| **Rationale** | The project already has `.side-decor-right` and `.side-decor-left` with SVG pattern-based ornaments. Adding garden elements via the same SVG `<pattern>` mechanism is the most consistent approach. |
| **Alternatives Considered** | Separate absolute-positioned divs, additional `body::after` content, CSS-only leaf shapes |

### Decision 4: Color Palette for Garden Greens

| Item | Detail |
|------|--------|
| **Decision** | Use three soft green CSS custom properties: `--green-sage: #8a9a6e`, `--green-moss: #7a8c62`, `--green-pale: #c7d9b7` |
| **Rationale** | These tones sit on the warm/earthy side of green, complementing the existing gold (`#d4af37`), ivory (`#fbf7ee`), cream (`#f6efdf`), beige (`#e8dcc3`), and ink (`#3a3226`) palette without clashing. |
| **Alternatives Considered** | Forest green, emerald green, lime green |

### Decision 5: Bird Design

| Item | Detail |
|------|--------|
| **Decision** | Silhouette-style inline SVG of a simple flying bird (two curved paths forming wings and body) |
| **Rationale** | Matches the spec assumption ("stylized/silhouette-based not photorealistic"). SVGs scale crisply at any size. A minimal design fits the elegant wedding aesthetic. |
| **Alternatives Considered** | Unicode bird characters, CSS-art birds, emoji |

### Decision 6: `prefers-reduced-motion` Handling

| Item | Detail |
|------|--------|
| **Decision** | Already handled by existing CSS at line 740: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.001ms !important; ... } }`. New garden animations will naturally be covered by this existing rule. |
| **Rationale** | The project already has a comprehensive `prefers-reduced-motion` override. No new code needed. |
| **Alternatives Considered** | Separate `@media` block for each new animation |

## Existing Code Patterns to Follow

| Pattern | Location in Existing Code |
|---------|--------------------------|
| Background decorative elements | `body::before` (line 36–50), `.side-decor` (lines 57–93) |
| JS-spawned animated elements | `spawnParticles()` (lines 54–85) creates `.particle` and `.petal` divs |
| CSS animation with `@keyframes` | `floatUp` (lines 148–152), `petalFall` (lines 163–167), `bgDrift` (lines 47–50) |
| CSS custom properties for colors | `:root` block (lines 4–17) defines gold, cream, ink palette |
| Mobile responsiveness | `@media (max-width: 760px)` and `(max-width: 480px)` blocks (lines 88–93) |
| Reduced motion support | `@media (prefers-reduced-motion: reduce)` (lines 740–742) |

## What NOT to Change

- Existing gold side ornaments remain untouched — garden elements are additive
- Existing particles and petals remain — garden elements live in a different visual layer
- Index.html structure remains — no new sections or content blocks
- No new external dependencies, libraries, or font files
