import { ReactFlowProvider } from "reactflow";
import Sidebar from "./components/Sidebar";
import WorkflowCanvas from "./components/WorkflowCanvas";
import FormPanel from "./components/FormPanel";
import SandboxPanel from "./components/SandboxPanel";

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <h1>HR Workflow Design</h1>
            <p>
              (Developed by Soundharesh M)
            </p>
          </div>
        </header>

        <main className="layout-grid">
          <Sidebar />
          <section className="center-column">
            <div className="panel canvas-panel">
              <div className="panel-header">
                <h2>Workflow Canvas</h2>
                <p>
                  Drag nodes from the left, connect them, then configure each
                  step.
                </p>
              </div>
              <WorkflowCanvas />
            </div>
            <SandboxPanel />
          </section>
          <FormPanel />
        </main>
      </div>
    </ReactFlowProvider>
  );
}
