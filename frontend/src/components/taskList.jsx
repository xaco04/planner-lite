import { useState, useEffect } from 'react';
import { api } from '../api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Traer tareas
  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Crear tarea
  const handleAdd = async () => {
    if (!title) return;
    await api.post('/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  // Marcar como hecha
  const toggleStatus = async (task) => {
    const newStatus = task.status === 'done' ? 'pending' : 'done';
    await api.put(`/tasks/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  // Borrar
  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Planner Lite</h2>
      <input
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Agregar</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleStatus(task)}
            >
              [{task.priority}] {task.title}
            </span>
            <button onClick={() => handleDelete(task._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
