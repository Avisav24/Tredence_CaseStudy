# FlowHR — HR Workflow Designer

> A visual workflow orchestrator for HR teams. Design, configure, and simulate HR workflows with a drag-and-drop canvas.

![FlowHR Screenshot](./public/preview.png)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture

### Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | SSR-ready, preferred in JD, file-based routing |
| Canvas | `@xyflow/react` v12 | Battle-tested, extensible custom nodes |
| State | Zustand | Minimal boilerplate, built-in devtools |
| API Mocking | MSW v2 | Intercepts real `fetch()` calls — closest to production |
| Styling | Tailwind CSS + Vanilla CSS | Utility-first with custom overrides for React Flow |
| Language | TypeScript (strict) | Discriminated unions for complete type safety |

### Folder Structure

```
flowhr/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login & Signup pages
│   ├── designer/           # Main workflow designer page
│   ├── globals.css         # Aura Flow Design System tokens
│   └── page.tsx            # Premium Landing Page
├── components/
│   ├── canvas/             # WorkflowCanvas, Sidebar, CanvasToolbar
│   ├── layout/             # Navbar, Footer (Shared)
│   ├── nodes/              # BaseNode + 5 custom node types
│   ├── forms/              # NodeFormPanel + per-node form components
│   ├── sandbox/            # SandboxPanel (simulation modal)
│   └── ui/                 # Reusable primitives (Input, Button, Toggle…)
├── store/                  # Zustand store (single source of truth)
├── types/                  # TypeScript interfaces (discriminated unions)
├── lib/                    # graphUtils, simulationEngine, workflowSerializer
└── api/                    # workflowApi client + MSW mock handlers
```

---

## 🧠 Key Design Decisions

### 1. Discriminated Union Types
Node data uses TypeScript discriminated unions keyed on `nodeType`:
```typescript
type WorkflowNodeData = StartNodeData | TaskNodeData | ApprovalNodeData | AutomatedStepNodeData | EndNodeData;
```
This provides exhaustive type checking across all switch statements — no runtime casting needed.

### 2. DFS Cycle Detection
Graph validation uses a Depth-First Search with a `inStack` tracking set to detect cycles — the standard algorithm for directed graph cycle detection with O(V+E) complexity.

### 3. Topological Sort (Kahn's Algorithm)
The simulation engine uses Kahn's algorithm (BFS-based) to determine the correct node execution order, ensuring dependencies are always processed before dependents.

### 4. MSW over JSON Server
MSW intercepts real `fetch()` calls at the Service Worker level — the API client code is identical to what would hit a real backend. This tests real async patterns, not mocked module imports.

### 5. Zustand with Snapshot Undo/Redo
Every mutating action pushes a JSON snapshot to the undo stack (capped at 30 entries). Undo/Redo is available via `Ctrl+Z` / `Ctrl+Y`.

---

## ✅ Completed Features

- [x] 5 custom node types (Start, Task, Approval, Automated Step, End)
- [x] Drag-and-drop from sidebar onto canvas
- [x] Node connection with animated edges
- [x] Click to select + delete key to remove nodes/edges
- [x] Node configuration forms for each type
- [x] Dynamic action parameters (fetched from mock API)
- [x] Graph validation (cycles, orphan nodes, missing start/end, required fields)
- [x] Workflow simulation with step-by-step execution log
- [x] Live streaming steps in simulation panel
- [x] Undo/Redo (Ctrl+Z / Ctrl+Y, up to 30 steps)
- [x] Export/Import workflow as JSON
- [x] MiniMap
- [x] Zoom controls
- [x] Inline workflow name editor
- [x] Validation status in topbar

---

## 🔮 What I'd Add With More Time

- **Conditional edges**: Branch on approval outcome (Approved / Rejected paths)
- **Dagre auto-layout**: One-click automatic node positioning
- **Node templates**: Pre-built workflow templates (Onboarding, Leave Approval, etc.)
- **Backend persistence**: FastAPI + PostgreSQL for saving workflows
- **Real-time collaboration**: Yjs + WebSockets for multi-user editing
- **Storybook**: Component documentation for the design system
- **E2E tests**: Playwright tests for drag-drop, form edits, and simulation

---

## 📦 Mock API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/automations` | Returns list of available automation actions |
| `POST` | `/api/simulate` | Accepts workflow JSON, returns execution result |
| `POST` | `/api/validate` | Returns validation result for a workflow graph |

FlowHR is a high-performance visual workflow designer built for elite HR operations. It features a premium "Editorial Utility" design system, a robust simulation engine, and an extensive library of templates.

### ✨ Features

*   **Visual Canvas**: Premium designer with a high-contrast dot-grid and custom node archetypes.
*   **Templates Gallery**: Pre-built, industry-standard HR workflows (Onboarding, IT Requests, Leave Approval).
*   **Documentation Library**: A comprehensive hub for HR orchestration best practices and guides.
*   **Aura Flow Design System**: Minimal, high-impact dark UI inspired by Stripe and Linear.
*   **Sandbox Simulation**: Real-time topological execution logs with mock API integration.
*   **Graph Validation**: DFS-based cycle detection and workflow integrity checks.
*   **Persistence**: Undo/Redo history, JSON Export/Import, and template loading.
