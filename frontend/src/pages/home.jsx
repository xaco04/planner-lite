import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setLatest(res.data.slice(-5).reverse())) // últimas 5 tareas
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h3>Últimas novedades</h3>
      <ul>
        {latest.map(task => (
          <li key={task._id}>
            [{task.priority}] {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
