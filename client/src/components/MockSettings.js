import React from 'react';

const MockSettings = ({ mockEnabled, setMockEnabled }) => {
  return (
    <div className="p-2 border rounded">
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={mockEnabled} onChange={e => setMockEnabled(e.target.checked)} />
        <span>Enable Mock Data</span>
      </label>
    </div>
  );
};

export default MockSettings;
