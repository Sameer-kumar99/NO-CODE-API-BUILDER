import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  const createProject = async () => {
    const name = prompt('Project name');
    if (!name) return;
    const res = await api.post('/projects', { name });
    navigate(`/projects/${res.data._id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Your Projects</h1>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={createProject}>New Project</button>
      </div>
      <ul className="list-disc pl-6">
        {projects.map(p => (
          <li key={p._id} className="mb-1">
            <Link className="text-blue-600" to={`/projects/${p._id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
