import { Handle, Position } from 'reactflow';
import type { PropsWithChildren } from 'react';

export function NodeCard({
  title,
  subtitle,
  colorClass,
  children,
  disableTarget,
  disableSource,
}: PropsWithChildren<{
  title: string;
  subtitle: string;
  colorClass: string;
  disableTarget?: boolean;
  disableSource?: boolean;
}>) {
  return (
    <div className="node-card">
      {!disableTarget && <Handle type="target" position={Position.Top} />}
      <div className={`node-badge ${colorClass}`}>{title}</div>
      <div className="node-subtitle">{subtitle}</div>
      <div className="node-content">{children}</div>
      {!disableSource && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
}
