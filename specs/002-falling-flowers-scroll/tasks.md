---

description: "Task list for Falling Flowers While Scrolling feature"
---

# Tasks: Falling Flowers While Scrolling

**Input**: Design documents from `/specs/002-falling-flowers-scroll/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: The spec does not explicitly require test tasks. Validation is performed via manual visual inspection per quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Static website**: All source files at repository root
- `index.html` — single-page wedding invitation (existing)
- `style.css` — all styles (existing, will add flower CSS)
- `script.js` — all JavaScript (existing, will add flower generator)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization — no build tools or dependencies needed for this static site.

- [X] T001 Review existing codebase patterns (particles, petals) in `script.js` and `style.css` to ensure the falling flower system follows the same conventions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Add flower container `<div id="side-flowers">` to `index.html` just inside the `<body>` tag, before the `particles` container, with `aria-hidden="true"` for accessibility
- [X] T003 Create base CSS for falling flowers in `style.css` — define `.side-flower` class with:
  - `position: fixed`, `pointer-events: none`, `z-index: 2` (behind content, above background)
  - Base styles: font-size, color (via CSS variable), opacity, will-change: transform
  - Left-side variant: `.side-flower--left` with `left: 8px`
  - Right-side variant: `.side-flower--right` with `right: 8px`
  - Exit/fade-out state: `.side-flower--exiting` with opacity transition to 0
- [X] T004 [P] Define CSS keyframe animation `@keyframes flowerFall` in `style.css` for the fall trajectory:
  - Vertical downward translation
  - Horizontal sway (sinusoidal-like movement via multiple keyframes)
  - Rotation along the fall path
  - Uses only transform and opacity (GPU-accelerated properties)

**Checkpoint**: Foundation ready — flower elements can be rendered and animated with CSS

---

## Phase 3: User Story 1 - Falling Flowers from Both Sides (Priority: P1) 🎯 MVP

**Goal**: Continuous flower cascade from left and right edges of the viewport while scrolling

**Independent Test**: Load the page, scroll through all sections, and verify flower petals continuously fall from both left and right edges

### Implementation for User Story 1

- [X] T005 [P] [US1] Create `FlowerGenerator` initialization function in `script.js` that:
  - Reads viewport dimensions and device type (desktop/tablet/mobile)
  - Checks `prefers-reduced-motion` via `window.matchMedia`
  - Sets up capacity limits per device class from data-model.md config
  - Returns a generator controller object with start/stop/destroy methods
- [X] T006 [P] [US1] Create flower spawn functions in `script.js` that:
  - `spawnFlower(side)`: Creates a `.side-flower` div, sets side class, randomly selects
    flower symbol (❀ ✿ ❁ 🌸), size (14–28px), color from palette, fall speed (6–14s),
    sway amount, and rotation
  - Appends to `#side-flowers` container
  - Triggers the `flowerFall` animation with randomized duration via `style.animationDuration`
  - Returns the created element for tracking
- [X] T007 [US1] Implement `start()` method in `script.js` that:
  - Creates two interval timers (left and right sides) with randomized intervals
    (left: 400–700ms desktop, right: 500–900ms desktop; scales for smaller viewports)
  - Each interval calls `spawnFlower(side)` for its respective side
  - Left and right intervals have different base ranges to ensure asymmetry
- [X] T008 [US1] Implement automated cleanup in `script.js` that:
  - Monitors active flower count against max concurrent limit per device
  - Removes elements that have finished their animation (using `animationend` event)
  - Removes elements that have scrolled out of view
  - Stops spawn intervals when count exceeds limit, resumes when below limit
- [X] T009 [US1] Integrate `FlowerGenerator` into page lifecycle in `script.js`:
  - Initialize generator in the existing `DOMContentLoaded` handler
  - Start generating flowers on page load (with optional 1s delay for initial render)
  - Ensure generator starts after the loader screen finishes
  - No explicit scroll trigger needed — flowers just fall continuously once started

**Checkpoint**: At this point, User Story 1 should be fully functional — flowers fall from both sides on page load

---

## Phase 4: User Story 2 - Visually Cohesive Flower Design (Priority: P2)

**Goal**: Falling flowers match the wedding theme with harmonious colors, appropriate opacity, and accessibility support

**Independent Test**: View page and verify flower colors match gold/cream/blush palette, are semi-transparent, and respect reduced-motion settings

### Implementation for User Story 2

- [X] T010 [P] [US2] Define flower color palette logic in `script.js` that:
  - Uses an array of CSS color values: `var(--gold)`, `var(--gold-light)`,
    `var(--gold-dark)`, `var(--cream)`, `var(--ivory)`, and a soft blush `#e8b4b8`
  - Randomly selects from this array when spawning each flower
  - Respects existing `:root` CSS custom properties
- [X] T011 [P] [US2] Add `prefers-reduced-motion` handling in `script.js`:
  - In generator `init()`, add `matchMedia('(prefers-reduced-motion: reduce)')` listener
  - If reduced motion is detected, set `reducedMotion = true` and suppress all spawning
  - Listen for changes: if user changes setting, dynamically start/stop generation
  - Add `.side-flower` base opacity of 0.5–0.7 to ensure semi-transparency
- [X] T012 [US2] Ensure flower elements do not obstruct content in `style.css`:
  - Set `z-index: 2` on `.side-flower` (existing particles use z-index: 2)
  - Ensure all content sections have `z-index: 1` (already set, verify)
  - The particles container `#particles` has `z-index: 2` — ensure flowers are at
    same or lower level

**Checkpoint**: At this point, User Stories 1 AND 2 should both work — flowers are visually cohesive and accessible

---

## Phase 5: User Story 3 - Performant on All Devices (Priority: P3)

**Goal**: Smooth 60fps animation on all devices with adaptive flower count and mobile responsiveness

**Independent Test**: Load on a mid-range device, scroll through all sections, verify smooth 60fps without jank

### Implementation for User Story 3

- [X] T013 [US3] Implement adaptive capacity limits in `script.js`:
  - Add viewport-width detection on init to select config (desktop/tablet/mobile)
  - Max concurrent: 20 (desktop, >1024px) / 14 (tablet, 480–1024px) / 10 (mobile, <480px)
  - Spawn intervals scale proportionally (wider intervals on smaller devices)
  - Re-check on window resize (`debounced resize` event listener)
- [X] T014 [US3] Optimize element reuse and cleanup in `script.js`:
  - After a flower finishes animating (animationend), immediately remove from DOM
  - Track active flowers count; if approaching limit, skip next spawn cycle
  - Use `requestAnimationFrame`-friendly approach — avoid forced reflows
  - Use `element.remove()` rather than `display: none` to free memory
- [X] T015 [US3] Add mobile/print defensive styling in `style.css`:
  - `@media (max-width: 480px)`: Reduce `.side-flower` size range, decrease spawn rate
  - `@media print`: Hide `#side-flowers` with `display: none`
  - Ensure `@media (prefers-reduced-motion: reduce)` also prevents CSS animations
    (the JS check already prevents spawning, but add CSS guard too)

**Checkpoint**: All user stories should now be fully functional with performance optimization

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [X] T016 [P] Add fallback for browsers without CSS animation support — flowers should
  be hidden gracefully (feature detection via `@supports (animation-name: test)` or JS
  `typeof document.body.style.animation !== 'undefined'`)
- [X] T017 Run validation scenarios from `quickstart.md`:
  - Load page and scroll through all sections
  - Verify flowers from both sides, no content obstruction
  - Verify reduced-motion suppression
  - Verify mobile viewport adaptation
  - Verify no layout thrashing in DevTools performance tab

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (Phase 3) must complete before US2 (Phase 4) and US3 (Phase 5)
  - US2 and US3 can proceed in parallel once US1 is done
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Core implementation — all other stories build on this
- **User Story 2 (P2)**: Depends on US1 — enhances visual appearance of existing flowers
- **User Story 3 (P3)**: Depends on US1 — optimizes performance of existing system

### Within Each Phase

- Tasks marked [P] can be done in parallel (different concerns, no file conflicts)
- Non-[P] tasks must be done sequentially as listed

### Parallel Opportunities

- T003 (left/right CSS) and T004 (keyframes) can run in parallel
- T005 (generator init) and T006 (spawn functions) can run in parallel
- T010 (color palette) and T011 (reduced-motion) can run in parallel
- US2 visual enhancements can be developed alongside US3 performance work

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (flowers falling from both sides)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → CSS base + HTML container ready
2. Add User Story 1 → Flowers falling from both sides → Test independently (MVP!)
3. Add User Story 2 → Visual cohesion + reduced-motion → Test independently
4. Add User Story 3 → Performance optimization + mobile → Test independently
5. Polish → Final validation → Complete

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- The existing particle/petal system (`makeParticle`, `makePetal` in script.js) serves
  as a reference pattern for the flower generator
- All CSS animations must use GPU-accelerated properties (transform, opacity) only
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
