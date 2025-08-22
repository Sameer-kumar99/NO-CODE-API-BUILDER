import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, Background } from 'react-flow-renderer';
import EndpointModal from './EndpointModal';

const ApiDesigner = ({ project, onChange }) => {
  const [nodes, setNodes] = useState(project.endpoints || []);
  const [edges, setEdges] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const saveEndpoint = (data) => {
    const newNodes = [...nodes, { id: `${nodes.length}`, position: { x: 10, y: nodes.length * 70 }, data }];
    setNodes(newNodes);
    onChange && onChange(newNodes);
    setShowModal(false);
  };

  return (
    <div style={{ height: 500 }}>
      <button className="bg-green-500 text-white px-2 py-1 mb-2" onClick={() => setShowModal(true)}>Add Endpoint</button>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
        <Background />
      </ReactFlow>
      {showModal && <EndpointModal onClose={() => setShowModal(false)} onSave={saveEndpoint} />}
    </div>
  );
};

export default ApiDesigner;
