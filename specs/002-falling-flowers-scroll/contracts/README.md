# Contracts: Falling Flowers While Scrolling

**Phase**: 1 — Design

This feature is a purely visual enhancement to a static single-page wedding website.
No external interfaces exist — there are no APIs, CLI commands, library exports,
database schemas, or service contracts associated with this feature.

The only "interface" is the browser DOM, which is standardized and requires no
custom contract documentation. The feature integrates with the existing codebase
by:
- Adding CSS class definitions to `style.css`
- Adding JavaScript functions to `script.js` (following the existing particle/
  petal generator pattern)
- Adding HTML elements to `index.html` (a container div for the flowers)

Refer to [data-model.md](../data-model.md) for the runtime UI element definitions.
