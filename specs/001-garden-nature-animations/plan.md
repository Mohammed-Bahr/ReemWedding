# Implementation Plan: Garden Nature Animations

**Branch**: `001-garden-nature-animations` | **Date**: 2026-07-05 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-garden-nature-animations/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add animated green branches, flying birds, and garden-themed side decorations to the existing wedding invitation static site. This is a pure frontend/CSS/JS enhancement — no backend changes, no new dependencies. Three visual layers: (1) background green branches with gentle sway animation, (2) animated bird silhouettes flying across the page, (3) garden side decorations (leaves/vines/flowers) blending with existing gold ornaments. All animations respect `prefers-reduced-motion` and use GPU-accelerated CSS properties for 60fps performance.

## Technical Context

**Language/Version**: HTML5, CSS3 (modern CSS animations/transitions), JavaScript ES6+

**Primary Dependencies**: None — vanilla HTML/CSS/JS only; existing project uses no frameworks

**Storage**: N/A — static site, no data persistence

**Testing**: Manual visual inspection across browsers (Chrome, Firefox, Safari, Edge); browser DevTools Performance tab for 60fps verification; `prefers-reduced-motion` OS/browser setting test

**Target Platform**: Modern web browsers — Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Project Type**: Static website (Arabic wedding invitation single-page site)

**Performance Goals**: 60fps animations; page load increase <300ms; no layout thrashing

**Constraints**: Must work at 320px–1440px viewports; all animated elements behind content (z-index); green tones must complement existing gold/cream color palette

**Scale/Scope**: Single HTML page; purely visual additive changes; no backend, no data, no API

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file (`.specify/memory/constitution.md`) contains placeholder/template content with no actual principles or constraints defined. No gates apply.

**Pre-Phase-0**: ✅ PASS (no active constitutional constraints)

**Post-Phase-1 Re-evaluation**: ✅ PASS — design artifacts generated; constitution still has no active constraints. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-garden-nature-animations/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Created by /speckit.tasks
```

### Source Code (repository root)

```text
# Single project — static website
index.html         # Wedding invitation HTML
style.css          # All styles (existing + new garden/bird animations)
script.js          # Existing JS + new bird/branch spawner logic
music.mp3          # Background music (unchanged)
```

**Structure Decision**: The project is a flat single-page static site. No subdirectories. All new CSS goes in `style.css`, all new JS in `script.js`. The existing structure is preserved.

## Complexity Tracking

> No Constitution Check violations — Complexity Tracking not required.

## Phase 0 — Research Notes

All technical unknowns for this feature are resolved directly from the existing codebase (examined `index.html`, `style.css`, `script.js`). No external research needed. Design decisions:

- **Branch rendering approach**: CSS pseudo-elements or absolute-positioned SVG/CSS shapes with `@keyframes` sway animation
- **Bird rendering approach**: JavaScript-spawned SVG or CSS-art bird silhouettes with varied flight paths using CSS `@keyframes` or JS-controlled transforms
- **Garden side decorations**: Extend existing `.side-decor` pattern or add new fixed-position divs with leaf/vine SVG patterns
- **Color palette**: Soft greens — `#7a9e6b` (sage), `#8fbc8f` (moss), `#c7d9b7` (pale sage) — to complement gold `#d4af37` and ivory `#fbf7ee`
- **Animation technique**: Use CSS `transform` and `opacity` only (GPU-composited) for 60fps; avoid animating `width`, `height`, `top`, `left`
- **Bird flight pattern**: CSS `@keyframes` with curved `translate` paths + `scaleX` for direction flips
