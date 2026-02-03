const express = require('express'); // framework para crear un servidor web en Node.js, manejar rutas, request, response etc...
const cors = require('cors'); // middleware que permite que el backend acepte peticiones desde otro origen (por ejemplo el frontend en otro puerto)
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');


const app = express();
const PORT = 5000;

const Task = require('./models/Task');

// Conectar Mongo en el index.js
mongoose.connect('mongodb://localhost:27017/planner-lite')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

// Middleware (funcion que se ejecuta cada vez que llega una request, use sirve para registrar middleware)
app.use(express.json()); // Convierte los datos JSON que envía el cliente (frontend) en un objeto JS usable en tu backend.
app.use(cors());


app.use('/projects', projectRoutes);

// ----------------------------
//      RUTAS ENDPOINTS 
// ----------------------------

// Health check
app.get('/health', (req, res) => {  // req = la request (información de la petición que llega: headers, body, URL, etc.) y res = a response (lo que tu servidor envía de vuelta al cliente)
  res.json({ status: 'ok' });
});


// Listar tareas (opcionalmente filtradas por status y prioridad)
app.get('/tasks', async (req, res) => {
  try {
    const { status, priority, projectId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = Number(priority);
    if (projectId) filter.project = projectId; // 🔑 CLAVE

    const tasks = await Task.find(filter)
      .sort({ priority: 1, dueDate: 1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Crear tarea
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Actualizar tarea (status, title, description, priority, dueDate)
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task no encontrada' });
    res.json({ message: 'Task eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
//         Start server
// -----------------------------
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
