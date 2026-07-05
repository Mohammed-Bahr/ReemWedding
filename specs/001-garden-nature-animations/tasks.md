# Tasks: Garden Nature Animations

**Input**: Design documents from `specs/001-garden-nature-animations/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in spec — no test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: files at repository root — `style.css`, `script.js`, `index.html`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the green color palette CSS custom properties used by all three user stories

- [X] T001 Add green palette CSS custom properties (`--green-sage`, `--green-moss`, `--green-pale`) to `:root` in `style.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Each user story is independent — no foundational phase needed. The green CSS variables from Phase 1 are the only shared dependency.

**Checkpoint**: Green palette variables available — all user stories can proceed independently

---

## Phase 3: User Story 1 - Garden Background with Animated Branches (Priority: P1) 🎯 MVP

**Goal**: Render decorative green branch elements on both sides of the page with a gentle CSS sway animation, behind all content.

**Independent Test**: Load the page and verify green branch silhouettes are visible on left and right edges, swaying smoothly.

### Implementation for User Story 1

- [X] T002 [P] [US1] Create CSS `@keyframes branchSway` animation in `style.css` using `transform: rotate()` with gentle angle variation
- [X] T003 [P] [US1] Add `.garden-branch` styles with `position: fixed`, appropriate `z-index` behind content, green color from palette, and `animation: branchSway` in `style.css`
- [X] T004 [P] [US1] Add `.garden-branch::before` and `.garden-branch::after` pseudo-element styles drawing the branch SVG shapes (curved paths with `border-radius`) in `style.css`
- [X] T005 [US1] Add `.garden-branch` elements to `index.html` (left + right side containers) with `aria-hidden="true"`

**Checkpoint**: At this point, User Story 1 should be fully functional — green branches visible on both sides with gentle sway animation.

---

## Phase 4: User Story 3 - Cohesive Garden Side Decorations (Priority: P1)

**Goal**: Extend existing gold side ornaments with garden-themed elements (leaves, vines, flowers) using complementary green tones.

**Independent Test**: Load the page and verify garden decorations (leaves/vines/flowers in green tones) are visible on side edges, harmonizing with existing gold ornaments.

### Implementation for User Story 3

- [X] T006 [P] [US3] Define garden-themed SVG patterns (leaf, vine, flower motifs) in `<defs>` within `index.html` using the green palette colors
- [X] T007 [P] [US3] Add `.garden-side` extension styles in `style.css` overlaying or blending garden patterns onto the existing `.side-decor` containers
- [X] T008 [P] [US3] Add `.garden-side` `@keyframes` for subtle sway/growth animation in `style.css`
- [X] T009 [US3] Integrate `.garden-side` SVG patterns into the side ornament structure in `index.html`, preserving existing gold elements

**Checkpoint**: At this point, User Stories 1 AND 3 should both work — branches plus garden side decorations create a cohesive garden look.

---

## Phase 5: User Story 2 - Animated Birds in the Scene (Priority: P2)

**Goal**: Animated bird silhouettes (inline SVG) spawned via JavaScript, flying across the screen with varied paths, speeds, and timing.

**Independent Test**: Load the page and wait 10–15 seconds — birds should appear, fly across with smooth varied paths, and loop.

### Implementation for User Story 2

- [X] T010 [P] [US2] Create CSS `@keyframes birdFly` animation for bird flight path (horizontal translate + vertical curvature) in `style.css`
- [X] T011 [P] [US2] Create CSS `@keyframes birdFlap` animation for wing flapping in `style.css`
- [X] T012 [P] [US2] Add `.bird` class styles with `position: fixed`, `z-index` behind content, using green-moss color from palette in `style.css`
- [X] T013 [US2] Implement `birdSvg()` function returning inline SVG bird silhouette markup in `script.js`
- [X] T014 [US2] Implement `createBird()` function that creates a `.bird` div with random flight parameters (start position, duration, scale, direction, delay) in `script.js`
- [X] T015 [US2] Implement `spawnBirds()` with `setInterval` ticking every 8s, spawning birds at random Y positions (20–75vh) with varied speeds and sizes, in `script.js`
- [X] T016 [US2] Implement `clearBirds()` cleanup function and wire auto-start on `DOMContentLoaded` in `script.js`
- [X] T017 [US2] Add `.bird` spawner call to the existing `DOMContentLoaded` handler in `script.js`, alongside existing particles/petals

**Checkpoint**: At this point, all three user stories should be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ensure responsive behavior, performance, and print handling across all three stories.

- [X] T018 [P] Add responsive overrides for `.garden-branch`, `.garden-side`, and `.bird` under `@media (max-width: 760px)` and `(max-width: 480px)` in `style.css`
- [X] T019 [P] Add `@media print` rule to hide `.garden-branch`, `.garden-side`, and `.bird` elements in `style.css`
- [X] T020 Verify all new animations use only `transform` and `opacity` properties for GPU compositing (check for any animated `width`, `height`, `top`, `left` in `style.css`)
- [X] T021 Run quickstart.md validation — test at 320px, 768px, 1024px, 1440px viewports; verify all acceptance scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: No blocking prerequisites — stories can proceed independently
- **User Stories (Phase 3–5)**: All three are independent and can be done in any order
  - US1 (P1) recommended first as MVP
  - US3 (P1) recommended second
  - US2 (P2) can be done last or in parallel
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories
- **User Story 3 (P1)**: Aesthetic complement to US1 but functionally independent
- **User Story 2 (P2)**: No dependencies on other stories

### Within Each User Story

- CSS `@keyframes` before classes
- Classes before markup
- Static elements before dynamic (JS) elements
- Story complete before moving to next priority

### Parallel Opportunities

- T002, T003, T004 (US1 CSS) can run in parallel
- T006, T007, T008 (US3 CSS/SVG) can run in parallel
- T010, T011, T012 (US2 CSS) can run in parallel
- T013, T014 (US2 JS) are sequential
- T018, T019 (Polish) can run in parallel
- All three user stories can be implemented in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch all CSS for User Story 1 together:
Task: "Create CSS @keyframes branchSway animation in style.css"
Task: "Add .garden-branch styles in style.css"
Task: "Add .garden-branch pseudo-element branch shapes in style.css"
```

## Parallel Example: User Story 2

```bash
# Launch all CSS for User Story 2 together:
Task: "Create CSS @keyframes birdFly in style.css"
Task: "Create CSS @keyframes birdFlap in style.css"
Task: "Add .bird class styles in style.css"

# Then sequentially:
Task: "Implement birdSvg() in script.js"
Task: "Implement createBird() in script.js"
Task: "Implement spawnBirds() in script.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (add green CSS vars)
2. Complete Phase 3: User Story 1 (green branches)
3. **STOP and VALIDATE**: Test branches independently
4. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + Phase 3 → Branch animation working (MVP!)
2. Add Phase 4 (US3) → Garden side decorations complete
3. Add Phase 5 (US2) → Birds complete
4. Add Phase 6 → Polish and cross-cutting

### Parallel Team Strategy

With multiple developers:

1. Developer A: User Story 1 (branches)
2. Developer B: User Story 3 (garden decorations)
3. Developer A (or C): User Story 2 (birds, after CSS variables are available)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All CSS animations must use only `transform` and `opacity` for 60fps GPU compositing
- The existing `prefers-reduced-motion` rule at line 740 of `style.css` already covers all new animations
