# Quickstart: Garden Nature Animations

**Phase**: 1 — Design & Contracts

**Date**: 2026-07-05

**Prerequisites**: A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

No build step, package manager, or server required. This is a static HTML site.

## Validation Scenarios

### Scenario 1: Green Branches Visible

```
1. Open index.html in a browser
2. Verify that green branch elements appear on both left and right sides
   of the page
3. Verify branches sway gently with a slow, smooth animation
4. Verify branches are behind all text content (not obscuring readability)
```

**Expected**: Two decorative branch elements are visible on the page edges, animated with a gentle sway, layered behind content.

### Scenario 2: Animated Birds

```
1. Open index.html in a browser
2. Wait 10–15 seconds for the first bird to appear
3. Verify the bird flies smoothly across the screen from one side to the other
4. Verify subsequent birds appear at different positions and heights
5. Verify birds are removed after crossing the screen
```

**Expected**: Birds appear at intervals, follow varied curved flight paths, and loop naturally.

### Scenario 3: Garden Side Decorations

```
1. Open index.html in a browser
2. Verify garden-themed elements (leaves, vines, or flowers) are visible
   on the side edges of the page
3. Verify they complement the existing gold side ornaments
4. Verify they use soft green tones (sage, moss, pale green)
```

**Expected**: Garden decorations blend with existing gold ornaments using green tones.

### Scenario 4: Mobile Responsiveness

```
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test at viewport widths: 1440px, 1024px, 768px, 480px, 320px
4. Verify at each breakpoint:
   - Branches scale/adapt without breaking layout
   - Birds are visible (may be smaller)
   - No content is obscured
```

**Expected**: Decorative elements gracefully adapt to all screen sizes.

### Scenario 5: Reduced Motion

```
1. Enable prefers-reduced-motion in OS/browser:
   - Windows: Settings > Ease of Access > Display > "Show animations" OFF
   - macOS: System Settings > Accessibility > Display > "Reduce motion" ON
   - Chrome DevTools: Rendering tab > Emulate CSS media feature prefers-reduced-motion
2. Reload page
3. Verify all animations (branches, birds, garden) are paused or static
```

**Expected**: All decorative animations stop when reduced motion is preferred.

### Scenario 6: Performance Check

```
1. Open Chrome DevTools > Performance tab
2. Start recording
3. Interact with the page (scroll through all sections)
4. Stop recording
5. Check FPS counter — should maintain 60fps
6. Check for forced reflows/layout thrashing warnings
```

**Expected**: Smooth 60fps with no layout thrashing.

### Scenario 7: Print Test

```
1. Open index.html in browser
2. Press Ctrl+P (or Cmd+P on Mac)
3. Preview print layout
4. Verify background decorative elements are hidden or simplified
```

**Expected**: Clean print output without decorative background elements interfering.

## Files Modified

| File | Change |
|------|--------|
| `style.css` | Add CSS custom properties for green palette, branch styles, bird animation keyframes, garden decoration styles, responsive overrides |
| `script.js` | Add bird spawner logic (`spawnBirds`, `createBird`, `birdSvg`, `clearBirds`), branch initialization if needed |

## Files NOT Modified

- `index.html` — no structural changes needed
- `music.mp3` — unchanged

## Verification Command

```bash
# No build commands. Open in browser directly:
open index.html
# Or on Linux:
xdg-open index.html
```

## References

- [Data Model](data-model.md) — entity definitions and configuration values
- [Contracts](contracts/README.md) — CSS classes, JS functions, SVG shapes
- [Spec](spec.md) — functional requirements and acceptance criteria
- [Research](research.md) — design decisions and rationale
