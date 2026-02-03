const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');

// Listar todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un proyecto nuevo
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project no encontrado' });

    await Task.deleteMany({ project: req.params.id });

    res.json({ message: 'Project y tareas eliminadas' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
