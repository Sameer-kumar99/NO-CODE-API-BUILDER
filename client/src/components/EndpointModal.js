import React, { useState } from 'react';

const EndpointModal = ({ onClose, onSave }) => {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('');
  const [schema, setSchema] = useState('{}');

  const save = () => {
    try {
      const parsed = JSON.parse(schema || '{}');
      onSave({ method, path, schema: parsed });
    } catch (e) {
      alert('Invalid JSON schema');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 w-96">
        <h2 className="text-xl mb-2">Endpoint</h2>
        <div className="mb-2">
          <label className="block text-sm">Method</label>
          <select value={method} onChange={e => setMethod(e.target.value)} className="border p-1 w-full">
            {['GET','POST','PUT','DELETE'].map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm">Path</label>
          <input className="border p-1 w-full" value={path} onChange={e => setPath(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Response Schema (JSON)</label>
          <textarea className="border p-1 w-full" rows={4} value={schema} onChange={e => setSchema(e.target.value)} />
        </div>
        <div className="flex justify-end space-x-2">
          <button className="px-2 py-1" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-2 py-1" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EndpointModal;
