const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProject, updateProject, deleteProject, serveDocs } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/:id/docs', serveDocs);

module.exports = router;
