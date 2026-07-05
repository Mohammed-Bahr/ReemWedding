# Data Model: Garden Nature Animations

**Phase**: 1 — Design & Contracts

**Date**: 2026-07-05

**Note**: This feature is purely visual — no backend data persistence. The "entities" below are DOM/CSS design entities representing the visual elements, their properties, and animation states.

## Design Entities

### Entity 1: BranchElement

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| position | enum | `left`, `right`, `both` | Which side(s) to render |
| swayDuration | number (seconds) | Time for one full sway cycle | 4–8s range |
| swayAngle | number (degrees) | Max rotation angle | ±3° to ±8° |
| opacity | number | Base opacity | 0.3–0.6 |
| color | CSS color | Branch green color | Must be a green tone from palette |
| zLayer | number | Stacking order | Must be behind content (z-index < 1) |

**State transitions**: None (always animating via CSS `@keyframes`)

### Entity 2: BirdElement

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| startX | number (vw/vh) | Starting horizontal position | Off-screen (e.g., -10vw to -20vw) |
| startY | number (vh) | Starting vertical position | 20vh–80vh range |
| endX | number (vw) | Ending horizontal position | Off-screen opposite side |
| flightDuration | number (seconds) | Time to cross the screen | 6–15s |
| delay | number (seconds) | Random stagger before appearance | 0–10s |
| scale | number | Bird size multiplier | 0.5–1.5 |
| direction | enum | `ltr`, `rtl` | Flight direction |
| flapSpeed | number (seconds) | Wing flap animation duration | 0.3–0.6s |

**State transitions**: idle (hidden) → flying (animating across screen) → removed (DOM cleanup after animation ends)

### Entity 3: GardenSideDecoration

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| side | enum | `left`, `right` | Which side to decorate |
| elements | array | List of decoration types (leaf, vine, flower) | At least 1 element type |
| swayEnabled | boolean | Whether elements sway | Default: true |
| colorTint | CSS color | Green tint for decoration | Must complement existing gold |

**State transitions**: None (static decorations with optional subtle sway animation)

## Palette Reference (CSS Custom Properties)

```css
--green-sage: #8a9a6e;
--green-moss: #7a8c62;
--green-pale: #c7d9b7;
```

## Animation Configuration

```javascript
// Bird spawner config
const BIRD_CONFIG = {
  spawnInterval: 8000,       // ms between bird spawns
  minBirds: 1,
  maxBirds: 2,               // max simultaneous birds
  speedRange: [8, 15],       // seconds to cross screen
  sizeRange: [0.6, 1.2],
  yRange: [20, 75],          // vh range for flight height
  flapDurationRange: [0.3, 0.6]
};

// Branch config
const BRANCH_CONFIG = {
  sides: ['left', 'right'],
  swayDuration: 6,           // seconds
  swayAngle: 5,              // degrees
  opacity: 0.4
};

// Garden decoration config
const GARDEN_CONFIG = {
  elements: ['leaf', 'vine', 'flower'],
  opacity: 0.35,
  swayDuration: 8
};
```

## Relationships

```
Page Container (@viewport)
├── BranchElement (×2: left + right sides)
│   └── CSS ::before / ::after pseudo-elements
├── GardenSideDecoration (×2: left + right)
│   └── SVG pattern matching existing .side-decor structure
└── BirdElement (×N: dynamically spawned)
    └── JS-spawned div > inline SVG bird silhouette
```
