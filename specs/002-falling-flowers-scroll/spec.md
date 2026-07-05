# Feature Specification: Falling Flowers While Scrolling

**Feature Branch**: `002-falling-flowers-scroll`

**Created**: 2026-07-05

**Status**: Draft

**Input**: User description: "add falling flowers from both sides while scrolling"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Falling Flowers from Both Sides (Priority: P1)

As a wedding invitation viewer, I want to see beautiful flower petals and small blossoms gently falling from both the left and right sides of the page while I scroll, so that the invitation feels romantic, enchanting, and immersive like a ceremonial flower release.

**Why this priority**: This is the core request — the cascading flowers from both sides create a framed, ceremonial feel that enhances every section of the invitation as the user navigates through it.

**Independent Test**: Can be fully tested by loading the invitation page and scrolling through all sections while observing that flower petals continuously fall from both the left and right edges in a steady, natural cascade.

**Acceptance Scenarios**:

1. **Given** the invitation page is loaded, **When** the user begins scrolling, **Then** flower petals start falling from both the left and right edges of the page
2. **Given** flowers are falling, **When** the user scrolls down through different sections (opening, hero, speech, details), **Then** flowers continue falling throughout all sections without stopping
3. **Given** flowers fall from both sides, **When** observed, **Then** the falling pattern from the left side differs from the right side (varied timing, speed, and petal types) for a natural look
4. **Given** the user stops scrolling or reaches the footer, **When** observing the page, **Then** flowers continue to fall at a steady rate, maintaining the atmosphere

---

### User Story 2 - Visually Cohesive Flower Design (Priority: P2)

As a wedding invitation viewer, I want the falling flowers to match the elegant gold and cream wedding theme so that they feel like a natural part of the design rather than a separate or distracting element.

**Why this priority**: Visual consistency is critical for a wedding invitation — mismatched colors or styles would break the elegant atmosphere.

**Independent Test**: Can be tested by viewing the page and verifying that the falling flowers use colors and styles that harmonize with the existing gold, ivory, and cream palette.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the flowers fall, **Then** they use soft, elegant colors (gold, cream, soft blush, warm white) that match the wedding theme
2. **Given** the flowers are displayed, **When** viewed against the background, **Then** they are visible but semi-transparent enough to not obstruct content
3. **Given** the user has `prefers-reduced-motion` enabled, **When** the page loads, **Then** falling flower animations pause or display static decorative elements instead

---

### User Story 3 - Performant on All Devices (Priority: P3)

As a wedding invitation viewer on any device, I want the falling flowers animation to feel smooth and not cause lag, stuttering, or excessive battery drain so that my experience is enjoyable regardless of my device capabilities.

**Why this priority**: A wedding invitation should be accessible and pleasant on all devices. Performance issues would detract from the romantic experience.

**Independent Test**: Can be tested by loading the page on a mid-range mobile device and low-end laptop, scrolling through all sections, and verifying smooth 60fps animation without jank.

**Acceptance Scenarios**:

1. **Given** the page is loaded on a mobile device, **When** flowers fall while scrolling, **Then** the animation runs at a smooth framerate without visible stuttering
2. **Given** the page is loaded on a low-end device, **When** multiple flowers are on screen simultaneously, **Then** the flower count caps reasonably to maintain performance
3. **Given** the page is loaded, **When** observed in browser DevTools performance tab, **Then** no layout thrashing or forced reflows are detected from the flower animation

---

### Edge Cases

- What happens when `prefers-reduced-motion` is enabled? Flowers should either pause entirely or switch to a static decorative display.
- What happens on very narrow viewports (below 360px)? Flowers should scale down or limit count to not overwhelm the content area.
- What happens when the page is printed? Falling flowers should be hidden.
- How does this interact with existing petal/particle effects? Falling side flowers should complement rather than duplicate the existing top-falling petals.
- What happens if a user has JavaScript disabled? The page should still display gracefully without the falling flower effect.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST generate flower petal elements that fall from both the left and right edges of the viewport while the user scrolls
- **FR-002**: Falling flowers MUST be generated continuously throughout the user's scroll journey (not a one-time burst)
- **FR-003**: Flowers from the left side MUST have varied starting positions along the left edge and varied animation parameters (speed, size, rotation)
- **FR-004**: Flowers from the right side MUST have varied starting positions along the right edge and varied animation parameters independent of the left side
- **FR-005**: Falling flowers MUST respect the `prefers-reduced-motion` media query by pausing animations or displaying static alternatives
- **FR-006**: Flower elements MUST remain in a background layer (behind content) and MUST NOT obstruct readable text or interactive elements
- **FR-007**: System MUST limit the maximum number of visible flower elements on screen to ensure smooth performance
- **FR-008**: Flower visuals MUST use colors harmonizing with the existing gold/cream/ivory wedding color palette (gold, cream, blush, warm white tones)
- **FR-009**: On narrow viewports (below 480px), flower generation rate MUST decrease proportionally to avoid overwhelming the content
- **FR-010**: Flower animation MUST use only GPU-accelerated CSS properties (transform, opacity) to avoid layout thrashing

### Key Entities *(include if feature involves data)*

- **Falling Flower Element**: A decorative flower petal or small blossom rendered near the viewport edges, with properties: side (left/right), start position, size, fall speed, rotation speed, opacity, color/type
- **Flower Generator**: A controller that creates flower elements at intervals, managing spawn rate, maximum concurrent count, and cleanup of off-screen elements

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Falling flowers are visible from both the left and right edges on every section of the page when scrolling (verified by visual inspection across hero, speech, family, details, and footer sections)
- **SC-002**: No individual flower element overlaps or obscures readable text content at any viewport size (verified at 360px, 768px, 1024px)
- **SC-003**: Animation maintains 60 frames per second on modern devices (verified via browser DevTools performance tab during active scrolling)
- **SC-004**: Page load time increases by no more than 200ms compared to the current version (flower generation must not block initial render)
- **SC-005**: Flowers successfully pause or show static alternatives when `prefers-reduced-motion: reduce` is enabled (verified by enabling the setting in OS/browser)
- **SC-006**: At least 3 distinct flower/petal visual variations are used (different shapes, sizes, or subtle color variations) for natural variety
- **SC-007**: On narrow mobile viewports (below 480px), the visible flower count is reduced by at least 40% compared to desktop view

## Assumptions

- Falling flowers will be implemented as lightweight DOM elements with CSS animations (matching the existing particle system approach) rather than canvas or heavy JS rendering
- Flower visuals will be Unicode symbols (❀ ✿ ❁ 🌸) or simple SVG/CSS shapes, consistent with the existing petal system in the codebase
- The flower cascade will be additive to — not replacing — the existing top-falling petal and gold particle effects
- Flower colors will be derived from the existing color palette (gold, cream, ivory, soft blush) using CSS custom properties
- The feature requires no new backend, data storage, APIs, or external assets
- Modern browsers supporting CSS animations and IntersectionObserver are the target; graceful degradation for older browsers
- The flower animation should feel like a gentle, romantic cascade — not rapid or chaotic
