import { useState } from 'react';
import { simulateWorkflow } from '../api/mockApi';
import { useWorkflowStore } from '../store/workflowStore';
import { validateWorkflow } from '../utils/validation';
import type { SimulationStep } from '../types/workflow';

export default function SandboxPanel() {
  const { nodes, edges } = useWorkflowStore();
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validation = validateWorkflow(nodes, edges);

  const handleRun = async () => {
    setLoading(true);
    const result = await simulateWorkflow({ nodes, edges });
    setSteps(result.steps);
    setErrors(result.validationErrors);
    setLoading(false);
  };

  return (
    <section className="panel sandbox-panel">
      <div className="panel-header row-between">
        <div>
          <h2>Workflow Sandbox</h2>
          <p>Serialize the graph and run a mock simulation.</p>
        </div>
        <button className="primary-btn" onClick={handleRun} disabled={loading}>
          {loading ? 'Running...' : 'Run Simulation'}
        </button>
      </div>

      <div className="sandbox-grid">
        <div>
          <h3>Workflow JSON</h3>
          <pre className="code-block">{JSON.stringify({ nodes, edges }, null, 2)}</pre>
        </div>

        <div>
          <h3>Validation</h3>
          {validation.isValid ? (
            <div className="success-box">Workflow passes basic validation.</div>
          ) : (
            <ul className="error-list">
              {validation.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <h3>Execution Log</h3>
          {errors.length > 0 && (
            <ul className="error-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          {steps.length === 0 && errors.length === 0 ? <p className="muted">No simulation run yet.</p> : null}
          <div className="timeline">
            {steps.map((step, index) => (
              <div key={step.nodeId} className="timeline-item">
                <div className="timeline-index">{index + 1}</div>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
