const express = require('express');
const Project = require('../models/Project');
const openApiGenerator = require('../utils/openApiGenerator');
const mockDataGenerator = require('../utils/mockDataGenerator');

const dynamicRouter = express.Router();
exports.dynamicRouter = dynamicRouter;

exports.reloadRoutes = async () => {
  dynamicRouter.stack = [];
  const projects = await Project.find();
  projects.forEach(project => {
    (project.endpoints || []).forEach(ep => {
      const method = ep.method.toLowerCase();
      dynamicRouter[method](`/${project._id}${ep.path}`, (req, res) => {
        if (project.mockEnabled) {
          return res.json(mockDataGenerator(ep.schema));
        }
        res.json({ message: 'Endpoint not implemented' });
      });
    });
  });
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ ownerId: req.user.id });
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = await Project.create({ name: req.body.name, ownerId: req.user.id, endpoints: [] });
  await exports.reloadRoutes();
  res.json(project);
};

exports.getProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id, ownerId: req.user.id }, req.body, { new: true });
  await exports.reloadRoutes();
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.deleteOne({ _id: req.params.id, ownerId: req.user.id });
  await exports.reloadRoutes();
  res.json({ message: 'Deleted' });
};

exports.serveDocs = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!project) return res.status(404).json({ message: 'Not found' });
  const spec = openApiGenerator(project);
  res.json(spec);
};
