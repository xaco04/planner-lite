import { useEffect, useState } from 'react';
import { api } from '../api';
import { Container, Card, ListGroup } from 'react-bootstrap';

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setLatest(res.data.slice(-5).reverse()))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <h1 className="mb-4">Home</h1>
      <h3>Últimas novedades</h3>
      <ListGroup>
        {latest.map(task => (
          <ListGroup.Item key={task._id} className={task.status === 'done' ? 'text-decoration-line-through' : ''}>
            <strong>[{task.priority}]</strong> {task.title} - {task.status}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
