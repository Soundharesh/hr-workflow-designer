import type { WorkflowNodeType } from '../types/workflow';

const nodeCatalog: { type: WorkflowNodeType; label: string; description: string }[] = [
  { type: 'start', label: 'Start Node', description: 'Workflow entry point' },
  { type: 'task', label: 'Task Node', description: 'Human task such as collecting documents' },
  { type: 'approval', label: 'Approval Node', description: 'Manager or HR approval step' },
  { type: 'automation', label: 'Automated Step', description: 'System-triggered action' },
  { type: 'end', label: 'End Node', description: 'Workflow completion' },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, type: WorkflowNodeType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="panel sidebar">
      <div className="panel-header">
        <h2>Node Library</h2>
        <p>Drag these onto the canvas.</p>
      </div>
      <div className="sidebar-list">
        {nodeCatalog.map((item) => (
          <div
            key={item.type}
            className="sidebar-item"
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
