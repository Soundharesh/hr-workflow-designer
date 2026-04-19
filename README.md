# HR Workflow Designer Prototype

A React + TypeScript + React Flow prototype for visually building and simulating internal HR workflows such as onboarding, leave approval, and document verification.

## What is included

- Drag-and-drop React Flow canvas
- Five custom node types
  - Start
  - Task
  - Approval
  - Automation
  - End
- Dynamic node configuration panel
- Mock API layer
  - `GET /automations` equivalent through local async mock
  - `POST /simulate` equivalent through local async mock
- Workflow validation
  - exactly one Start node
  - at least one End node
  - missing connections
  - cycle detection
- Sandbox panel with workflow JSON and execution timeline

## Tech stack

- React
- TypeScript
- Vite
- React Flow
- Zustand

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Folder structure

```text
src/
  api/                mock API abstraction
  components/         canvas, forms, sandbox, custom nodes
  store/              Zustand workflow state
  types/              node and workflow interfaces
  utils/              validation and node creation helpers
```

## Design decisions

### 1. Zustand for app state
The workflow graph and selected node state are shared across the canvas, form panel, and sandbox. Zustand keeps this simple without adding too much boilerplate.

### 2. Node factory + typed defaults
Each node type is created through a factory so that default data shapes stay consistent and extensible.

### 3. Mock API abstraction
Even though this prototype uses local async mocks, the UI already talks to an API layer. This makes it easy to replace with a real backend later.

### 4. Type-first forms
Each node type has its own controlled form section. The automation node supports dynamic fields based on the selected mock action definition.

## Assumptions

- One workflow entry point is enough for this prototype.
- Simulation is linearized through topological sorting and supports only acyclic flows.
- Persistence and authentication are intentionally excluded per the case study.

## Additionally

- JSON import/export
- visual node-level error states
- undo/redo
- auto-layout
- better edge rules per node type
- test coverage with RTL and Playwright
