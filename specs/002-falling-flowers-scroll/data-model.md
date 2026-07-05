# Data Model: Falling Flowers While Scrolling

**Phase**: 1 — Design
**Feature**: [spec.md](./spec.md)

> **Note**: This feature is purely visual with no persistent data storage.
> The "data model" here represents the runtime UI elements and their properties.

---

## Entity: FallingFlower

A single flower petal or blossom element that falls from the viewport edge.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | `number` | Unique identifier | Auto-incrementing |
| `side` | `'left' \| 'right'` | Which edge the flower spawns from | Determined at creation |
| `startY` | `number` | Starting Y position as percentage of viewport height | 0–100 (randomized) |
| `size` | `number` | Element size in pixels | 14–28px (randomized) |
| `type` | `string` | Visual variant: flower symbol or CSS shape | One of: ❀ ✿ ❁ 🌸 or custom SVG |
| `color` | `string` | CSS color value | From project palette: gold, gold-light, cream, blush |
| `fallSpeed` | `number` | Duration of fall animation in seconds | 6–14s (randomized) |
| `swayAmount` | `number` | Horizontal drift in pixels | 30–80px (randomized) |
| `rotationSpeed` | `number` | Degrees of rotation per fall | 45–180deg (randomized) |
| `opacity` | `number` | Starting opacity | 0.4–0.75 (randomized) |
| `state` | `'spawning' \| 'falling' \| 'exiting'` | Lifecycle stage | Managed by generator |
| `element` | `HTMLElement` | The actual DOM node | Created/destroyed by generator |

### Lifecycle States

```
spawning → falling → exiting → (removed from DOM)
```

1. **spawning**: Element is created, positioned at the side edge, fade-in starts
2. **falling**: Element animates downward with sway and rotation using CSS keyframes
3. **exiting**: Element has fallen below viewport or animation completed; fade-out starts
4. **removed**: Element is cleaned up from DOM; `FallingFlower` object is garbage collected

---

## Entity: FlowerGenerator

Controls the creation, lifecycle, and cleanup of `FallingFlower` instances.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `isActive` | `boolean` | Whether generation is currently running | Controlled by scroll/visibility |
| `leftInterval` | `number \| null` | Interval ID for left-side spawner | setInterval handle |
| `rightInterval` | `number \| null` | Interval ID for right-side spawner | setInterval handle |
| `activeFlowers` | `Map<number, FallingFlower>` | Currently visible flowers | Max 20 (desktop) / 14 (tablet) / 10 (mobile) |
| `flowerCount` | `number` | Next auto-increment ID | Increments on each spawn |
| `reducedMotion` | `boolean` | Whether user prefers reduced motion | Checked on init via matchMedia |

### Configuration (Constants)

| Parameter | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Max concurrent flowers | 20 | 14 | 10 |
| Spawn interval (left) | 400–700ms | 500–900ms | 600–1000ms |
| Spawn interval (right) | 500–900ms | 600–1000ms | 700–1200ms |
| Fall duration range | 6–14s | 6–12s | 5–10s |
| Size range | 16–28px | 14–24px | 12–20px |

### State Transitions

```
init() → start() → [spawn loop] → stop() → destroy()
```

- `init()`: Read viewport dimensions, check reduced-motion preference
- `start()`: Begin spawn intervals for left and right sides
- `stop()`: Clear both intervals, prevent new spawns
- `destroy()`: Remove all existing flower elements from DOM, clear map

## Relationships

```
FlowerGenerator 1 ── spawns ──> * FallingFlower
FlowerGenerator 1 ── manages ──> * FallingFlower (active set)
```

- The `FlowerGenerator` creates `FallingFlower` instances at intervals
- Each `FallingFlower` belongs to exactly one `FlowerGenerator`
- The `FlowerGenerator` tracks all active flowers and cleans up finished ones
- The `FlowerGenerator` adapts config to current viewport width
