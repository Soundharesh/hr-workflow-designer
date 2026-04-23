# HR Workflow Designer Prototype
A React + TypeScript + React Flow prototype for visually building and simulating internal HR workflows such as onboarding, leave approval, and document verification.

## Screenshots

### Workflow Canvas
<img width="1423" height="813" alt="screenshot1" src="https://github.com/user-attachments/assets/894e4c92-45c3-4656-a776-c8b23f4ffd54" />



### Workflow JSON
<img width="691" height="495" alt="screenshot2" src="https://github.com/user-attachments/assets/ff5a5773-c758-4978-b45c-2081e0a92499" />


### Execution Log & Validation
<img width="359" height="666" alt="screenshot3" src="https://github.com/user-attachments/assets/d11042cb-0833-4c85-8a31-2340caf66501" />


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
Then open the local Vite URL shown in the terminal.   http://localhost:5173

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
