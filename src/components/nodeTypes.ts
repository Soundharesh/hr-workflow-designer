import StartNode from './nodes/StartNode';
import TaskNode from './nodes/TaskNode';
import ApprovalNode from './nodes/ApprovalNode';
import AutomationNode from './nodes/AutomationNode';
import EndNode from './nodes/EndNode';

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automation: AutomationNode,
  end: EndNode,
};
