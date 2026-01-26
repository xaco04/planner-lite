import { useEffect, useState } from 'react';
import { api } from '../api';
import { Container, Card, ListGroup } from 'react-bootstrap';
import TaskList from '../components/taskList';

export default function Projects() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Agrupar tareas por proyecto
  const projectsMap = {};
  tasks.forEach(task => {
    const project = task.project || 'Default Project';
    if (!projectsMap[project]) projectsMap[project] = [];
    projectsMap[project].push(task);
  });

  return (
    <Container>
      <h1 className="mb-4">Projects</h1>
      {Object.keys(projectsMap).map(project => (
        <Card className="mb-3" key={project}>
          <Card.Header as="h5">{project}</Card.Header>
          <Card.Body>
            <TaskList tasks={projectsMap[project]} refresh={() => api.get('/tasks').then(res => setTasks(res.data))}/>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
