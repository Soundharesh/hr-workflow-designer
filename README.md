# HR Workflow Designer (Prototype)

This is a small prototype of a visual workflow builder for HR processes (like onboarding, approvals, etc.).  
The idea is to let an admin create workflows by dragging nodes, connecting them, configuring each step, and running a basic simulation.



## What’s implemented

- Drag-and-drop workflow canvas (React Flow)
- Multiple node types:
  - Start
  - Task
  - Approval
  - Automated Step
  - End
- Editable configuration panel for each node
- Basic mock API layer for automation actions
- Simple workflow simulation panel (step-by-step log)
- Basic validation (e.g. workflow must start with a Start node)



## Tech Stack

- React + TypeScript (Vite)
- React Flow (for graph/canvas)
- Zustand (state management)
- Simple mock API (no backend)



## Project Structure
'''text
src/  
├── components/  
│   ├── Canvas/  
│   ├── Sidebar/  
│   ├── FormPanel/  
│   ├── Sandbox/  
│   └── nodes/  
├── store/  
├── api/  
└── types/  
'''

The structure is kept modular so adding new node types later is straightforward.



## How to run

npm install  
npm run dev  

App runs at:  
http://localhost:5173



## How it works (quick idea)

- Nodes and edges are stored globally using Zustand  
- Each node has a `type` and a `data` object  
- When a node is selected, the form panel updates its `data`  
- The sandbox serializes the workflow and simulates execution using a mock API  


## Design choices

- Used Zustand instead of Redux to keep things lightweight  
- Kept node logic separate from canvas logic  
- Forms are controlled components so they can be extended easily  
- Mock API instead of real backend to keep focus on frontend architecture  


## Assumptions

- No authentication needed  
- No persistence (everything is in-memory)  
- Validation is minimal (only basic structure checks)  

