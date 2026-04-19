import { useEffect, useMemo, useState } from 'react';
import { getAutomations } from '../api/mockApi';
import { useWorkflowStore } from '../store/workflowStore';
import type {
  ApprovalNodeData,
  AutomationAction,
  AutomationNodeData,
  EndNodeData,
  StartNodeData,
  TaskNodeData,
  WorkflowNode,
} from '../types/workflow';
import KeyValueEditor from './KeyValueEditor';

export default function FormPanel() {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore();
  const [automationOptions, setAutomationOptions] = useState<AutomationAction[]>([]);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) as WorkflowNode | undefined,
    [nodes, selectedNodeId]
  );

  useEffect(() => {
    getAutomations().then(setAutomationOptions);
  }, []);

  if (!selectedNode) {
    return (
      <aside className="panel form-panel">
        <div className="panel-header">
          <h2>Node Configuration</h2>
          <p>Select a node to edit it.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="panel form-panel">
      <div className="panel-header">
        <h2>Configure Node</h2>
        <p>
          Editing: <strong>{selectedNode.type}</strong>
        </p>
      </div>

      <div className="form-body">
        {selectedNode.type === 'start' && (
          <StartForm
            data={selectedNode.data as StartNodeData}
            onChange={(partial) => updateNodeData(selectedNode.id, partial)}
          />
        )}

        {selectedNode.type === 'task' && (
          <TaskForm
            data={selectedNode.data as TaskNodeData}
            onChange={(partial) => updateNodeData(selectedNode.id, partial)}
          />
        )}

        {selectedNode.type === 'approval' && (
          <ApprovalForm
            data={selectedNode.data as ApprovalNodeData}
            onChange={(partial) => updateNodeData(selectedNode.id, partial)}
          />
        )}

        {selectedNode.type === 'automation' && (
          <AutomationForm
            data={selectedNode.data as AutomationNodeData}
            actions={automationOptions}
            onChange={(partial) => updateNodeData(selectedNode.id, partial)}
          />
        )}

        {selectedNode.type === 'end' && (
          <EndForm
            data={selectedNode.data as EndNodeData}
            onChange={(partial) => updateNodeData(selectedNode.id, partial)}
          />
        )}
      </div>

      <button className="danger-btn" onClick={() => deleteNode(selectedNode.id)}>
        Delete Selected Node
      </button>
    </aside>
  );
}

function StartForm({
  data,
  onChange,
}: {
  data: StartNodeData;
  onChange: (partial: Partial<StartNodeData>) => void;
}) {
  return (
    <>
      <label>Start title</label>
      <input value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
      <KeyValueEditor label="Metadata" items={data.metadata} onChange={(metadata) => onChange({ metadata })} />
    </>
  );
}

function TaskForm({
  data,
  onChange,
}: {
  data: TaskNodeData;
  onChange: (partial: Partial<TaskNodeData>) => void;
}) {
  return (
    <>
      <label>Title</label>
      <input value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
      <label>Description</label>
      <textarea value={data.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} />
      <label>Assignee</label>
      <input value={data.assignee} onChange={(e) => onChange({ assignee: e.target.value })} />
      <label>Due date</label>
      <input type="date" value={data.dueDate} onChange={(e) => onChange({ dueDate: e.target.value })} />
      <KeyValueEditor
        label="Custom fields"
        items={data.customFields}
        onChange={(customFields) => onChange({ customFields })}
      />
    </>
  );
}

function ApprovalForm({
  data,
  onChange,
}: {
  data: ApprovalNodeData;
  onChange: (partial: Partial<ApprovalNodeData>) => void;
}) {
  return (
    <>
      <label>Title</label>
      <input value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
      <label>Approver role</label>
      <input value={data.approverRole} onChange={(e) => onChange({ approverRole: e.target.value })} />
      <label>Auto-approve threshold</label>
      <input
        type="number"
        value={data.autoApproveThreshold}
        onChange={(e) => onChange({ autoApproveThreshold: Number(e.target.value) })}
      />
    </>
  );
}

function AutomationForm({
  data,
  actions,
  onChange,
}: {
  data: AutomationNodeData;
  actions: AutomationAction[];
  onChange: (partial: Partial<AutomationNodeData>) => void;
}) {
  const selectedAction = actions.find((action) => action.id === data.actionId);

  const handleSelect = (actionId: string) => {
    const action = actions.find((item) => item.id === actionId);
    if (!action) {
      onChange({ actionId: '', actionLabel: '', actionParams: {} });
      return;
    }

    const nextParams = Object.fromEntries(action.params.map((param) => [param, data.actionParams[param] ?? '']));
    onChange({ actionId: action.id, actionLabel: action.label, actionParams: nextParams });
  };

  return (
    <>
      <label>Title</label>
      <input value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
      <label>Choose action</label>
      <select value={data.actionId} onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select automation</option>
        {actions.map((action) => (
          <option key={action.id} value={action.id}>
            {action.label}
          </option>
        ))}
      </select>

      {selectedAction?.params.map((param) => (
        <div key={param}>
          <label>{param}</label>
          <input
            value={data.actionParams[param] ?? ''}
            onChange={(e) =>
              onChange({
                actionParams: {
                  ...data.actionParams,
                  [param]: e.target.value,
                },
              })
            }
          />
        </div>
      ))}
    </>
  );
}

function EndForm({
  data,
  onChange,
}: {
  data: EndNodeData;
  onChange: (partial: Partial<EndNodeData>) => void;
}) {
  return (
    <>
      <label>End message</label>
      <input value={data.endMessage} onChange={(e) => onChange({ endMessage: e.target.value })} />
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={data.summaryFlag}
          onChange={(e) => onChange({ summaryFlag: e.target.checked })}
        />
        Summary flag
      </label>
    </>
  );
}
