# Research: Falling Flowers While Scrolling

**Phase**: 0 — Research & Decision Record
**Feature**: [spec.md](./spec.md)

## Overview

All design decisions were resolved from project context (existing wedding website
codebase). No NEEDS CLARIFICATION markers were required.

---

## Decision: Animation Approach

- **Decision**: CSS keyframe animations + JavaScript element generator
- **Rationale**: The existing codebase already uses this exact pattern for the
  gold particle system (`particle` class + `makeParticle()` in `script.js`) and
  petal system (`petal` class + `makePetal()`). Following the same approach
  ensures consistency, maintainability, and predictable performance.
- **Alternatives considered**:
  - Canvas/WebGL rendering: Overkill for flower petals; harder to integrate with
    existing DOM-based particle system
  - CSS-only approach: Cannot dynamically spawn elements tied to scroll position
  - Lottie/SVG animations: Adds external dependency; existing system is pure CSS+JS

---

## Decision: Flower Visuals

- **Decision**: Unicode flower symbols (❀ ✿ ❁ 🌸) as primary, with small inline
  SVG or CSS-drawn blossoms for variety
- **Rationale**: The existing petal system already uses Unicode symbols (❀ ✿ ❁).
  Matching this approach keeps visual consistency and avoids loading external assets.
- **Alternatives considered**:
  - Raster images (PNG): Would need multiple assets, not resolution-independent
  - Full SVG elements: More complex to generate dynamically; symbols are sufficient
  - Emoji (🌹🌺🌸): Less elegant, inconsistent rendering across platforms

---

## Decision: Spawn Mechanism (Scroll-Bound)

- **Decision**: Use `IntersectionObserver` on the main sections to activate/deactivate
  flower generation tied to scroll position, combined with a timed spawn interval
- **Rationale**: Flowers should fall continuously while the user is on the page,
  not just on initial load. The existing scroll-based reveal system already uses
  `IntersectionObserver`. Spawning flowers at a fixed interval (every 300-800ms)
  with randomized positions along both edges creates a natural cascade effect.
- **Alternatives considered**:
  - Scroll event listener: Less performant than IntersectionObserver; can cause
    layout thrashing
  - requestAnimationFrame loop: Good for rendering, but spawn timing is better
    handled by setInterval with random delays
  - One-time burst on load: Would not create the continuous scrolling effect desired

---

## Decision: Side Positioning

- **Decision**: Flowers spawn from fixed left and right edges (x=0 and x=viewport width)
  with randomized starting Y positions along the visible viewport height
- **Rationale**: The user explicitly requested "from both sides." Spawning at varied
  Y positions along each edge ensures flowers appear to be falling from the sides
  at different heights, creating a natural layered look.
- **Alternatives considered**:
  - Only from top corners: Would not achieve the "both sides while scrolling" effect
  - Random positions within side margins: Less structured than edge-based spawning

---

## Decision: Color Palette

- **Decision**: Use existing CSS custom properties: `var(--gold)`, `var(--gold-light)`,
  `var(--gold-dark)`, `var(--cream)`, `var(--ivory)`, plus soft blush (`#e8b4b8`)
  derived from the warm palette
- **Rationale**: The spec requires harmony with the existing gold/cream/ivory theme.
  Using the existing `:root` CSS variables ensures visual consistency and enables
  easy theme-wide changes.

---

## Decision: Performance Strategy

- **Decision**: Cap visible flowers at 20 concurrent elements; actively remove
  elements that have fallen out of the viewport; use only CSS `transform` and
  `opacity` animations (GPU-accelerated)
- **Rationale**: The spec requires 60fps even on low-end devices. Each flower
  element is a lightweight DOM node. Capping at 20 ensures minimal layout impact.
  Using GPU-accelerated properties prevents layout thrashing.
- **Max concurrent flowers by device**:
  - Desktop: 20
  - Tablet (768px): 14
  - Mobile (<480px): 10

---

## Decision: Reduced Motion

- **Decision**: Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and
  completely suppress flower generation when matched
- **Rationale**: Standard accessibility practice. The existing codebase already
  has `@media (prefers-reduced-motion: reduce)` in CSS. A JS-side check prevents
  unnecessary DOM creation.

---

## Summary of Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Animation | CSS keyframes + JS generator | Matches existing particle system |
| Flower visuals | Unicode symbols (❀ ✿ ❁) | Consistent with existing petal system |
| Spawn trigger | setInterval + IntersectionObserver | Continuous scroll effect |
| Side position | Fixed left/right edges, varied Y | User specified "from both sides" |
| Colors | Existing CSS variables + blush | Theme harmony |
| Performance cap | 20 flowers desktop, 10 mobile | Smooth 60fps on all devices |
| Reduced motion | JS + CSS matchMedia check | Accessibility compliance |

No unresolved research items remain. Ready for Phase 1 design.
