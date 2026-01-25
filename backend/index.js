// Importar librerias
const express = require('express'); // framework para crear un servidor web en Node.js, manejar rutas, request, response etc...
const cors = require('cors'); // middleware que permite que el backend acepte peticiones desde otro origen (por ejemplo el frontend en otro puerto)
const mongoose = require('mongoose');

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

// ENDPOINTS 
// Health check
app.get('/health', (req, res) => {  // req = la request (información de la petición que llega: headers, body, URL, etc.) y res = a response (lo que tu servidor envía de vuelta al cliente)
  res.json({ status: 'ok' });
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



// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
