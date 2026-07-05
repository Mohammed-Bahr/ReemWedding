# Quickstart: Falling Flowers While Scrolling

**Phase**: 1 — Validation Guide
**Feature**: [spec.md](./spec.md) | [data model](./data-model.md)

## Prerequisites

- A modern web browser (Chrome/Firefox/Safari/Edge)
- The wedding website project files served locally or on a web server
- No build tools, no dependencies, no backend required

## Setup

1. Open the project directory: `cd /home/mohammed_bahr/Projects/ReemWedding`
2. Serve the page locally (any static file server):
   ```bash
   # Option A: Using Python
   python3 -m http.server 8000
   
   # Option B: Using VS Code Live Server extension
   # Right-click index.html → Open with Live Server
   ```
3. Open `http://localhost:8000` in your browser

## Validation Scenarios

### Scenario 1: Falling Flowers Visible on Both Sides

1. Open the page and begin scrolling down
2. **Expected**: Flower petals (❀ ✿ ❁ 🌸) fall from both the left and right
   edges of the screen in a continuous cascade
3. **Expected**: The left and right sides have different spawn timings and
   flower types (not symmetrical/mirrored)

### Scenario 2: Flowers Continue Throughout Scroll

1. Scroll through all sections: Opening → Hero → Speech → Family → Details →
   Guest Message → Footer
2. **Expected**: Flowers continue falling in every section without stopping
3. **Expected**: Flowers do not jump or restart when transitioning between sections

### Scenario 3: No Content Obstruction

1. At each section, pause scrolling and inspect the readability of text content
2. **Expected**: No flower element overlaps or obscures readable text, headings,
   or interactive elements
3. **Expected**: Flowers remain visually behind content (lower z-index)

### Scenario 4: Visual Theme Harmony

1. Observe the flower colors against the background
2. **Expected**: Flower colors use gold, cream, ivory, and soft blush tones
   that match the existing wedding color palette
3. **Expected**: Flowers have subtle opacity (0.4–0.75) and do not distract
   from the main content

### Scenario 5: Performance Check

1. Open browser DevTools → Performance tab
2. Record a session while scrolling through the full page
3. **Expected**: No dropped frames; animation runs at 60fps
4. **Expected**: No layout thrashing or forced reflows from flower elements
   (only `transform` and `opacity` changes)

### Scenario 6: Mobile Responsiveness

1. Open DevTools device toolbar and test at 360px width (mobile)
2. **Expected**: Fewer flowers on screen (capped at ~10)
3. **Expected**: Flowers scale down proportionally (12–20px)
4. **Expected**: No layout breakage on narrow viewport

### Scenario 7: Reduced Motion Respect

1. Enable `prefers-reduced-motion: reduce` in OS/browser settings
   - Chrome DevTools: Rendering tab → Emulate CSS media feature →
     `prefers-reduced-motion: reduce`
   - macOS: System Settings → Accessibility → Display → Reduce motion
2. Reload the page and scroll
3. **Expected**: No falling flower elements are generated

### Scenario 8: Print Behavior

1. Open browser print dialog (Ctrl+P / Cmd+P)
2. Preview the page
3. **Expected**: Falling flowers are not visible in print output

## Expected Outcomes

| Scenario | Criteria | Verification Method |
|----------|----------|---------------------|
| 1, 2 | Flowers visible from both sides, continuous | Visual inspection |
| 3 | No content obstruction | Visual inspection at multiple viewports |
| 4 | Theme color harmony | Visual inspection against palette |
| 5 | 60fps, no layout thrashing | DevTools Performance tab |
| 6 | Mobile adaptation | DevTools device emulation |
| 7 | Reduced motion respected | OS/browser setting + reload |
| 8 | No flowers in print | Print preview |

## Cleanup

No changes to undo — the feature is purely additive CSS + JS.
To temporarily disable, comment out or remove the `initSideFlowers()` call in
`script.js`.
