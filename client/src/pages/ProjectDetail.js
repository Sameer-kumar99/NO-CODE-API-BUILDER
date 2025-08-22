import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ApiDesigner from '../components/ApiDesigner';
import DocsPreview from '../components/DocsPreview';
import MockSettings from '../components/MockSettings';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [mockEnabled, setMockEnabled] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data);
      setMockEnabled(res.data.mockEnabled);
    });
  }, [id]);

  const saveEndpoints = async (endpoints) => {
    const res = await api.put(`/projects/${id}`, { ...project, endpoints, mockEnabled });
    setProject(res.data);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <ApiDesigner project={project} onChange={saveEndpoints} />
      <MockSettings mockEnabled={mockEnabled} setMockEnabled={setMockEnabled} />
      <DocsPreview projectId={id} />
    </div>
  );
};

export default ProjectDetail;
