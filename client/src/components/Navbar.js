import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-3 flex space-x-4">
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/projects" className="hover:underline">Projects</Link>
      <button className="ml-auto" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
