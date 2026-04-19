import type { KVPair } from '../types/workflow';

interface Props {
  label: string;
  items: KVPair[];
  onChange: (items: KVPair[]) => void;
}

export default function KeyValueEditor({ label, items, onChange }: Props) {
  const updateItem = (index: number, field: keyof KVPair, value: string) => {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  };

  const addItem = () => onChange([...items, { key: '', value: '' }]);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="field-group">
      <div className="row-between">
        <label>{label}</label>
        <button type="button" className="ghost-btn" onClick={addItem}>
          + Add
        </button>
      </div>
      {items.length === 0 ? <p className="muted">No pairs added.</p> : null}
      {items.map((item, index) => (
        <div key={index} className="kv-row">
          <input
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateItem(index, 'key', e.target.value)}
          />
          <input
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateItem(index, 'value', e.target.value)}
          />
          <button type="button" className="danger-link" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
