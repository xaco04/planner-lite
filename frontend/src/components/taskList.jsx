import { api } from '../api';

export default function TaskList({ tasks, refresh }) {

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'done' ? 'pending' : 'done';
    await api.put(`/tasks/${task._id}`, { status: newStatus });
    refresh?.();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    refresh?.();
  };

  return (
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
  );
}
