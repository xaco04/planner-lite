import { api } from '../api';
import { ListGroup, Button } from 'react-bootstrap';

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
    <ListGroup>
      {tasks.map(task => (
        <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
          <span
            style={{ cursor: 'pointer', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}
            onClick={() => toggleStatus(task)}
          >
            [{task.priority}] {task.title} - {task.status}
          </span>
          <Button variant="danger" size="sm" onClick={() => handleDelete(task._id)}>Borrar</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
