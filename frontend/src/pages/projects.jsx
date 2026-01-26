import { useEffect, useState } from 'react';
import { api } from '../api';
import TaskList from '../components/taskList';

export default function Projects() {
  const [tasks, setTasks] = useState([]);
  
  // Para Planner Lite simple, todos los proyectos se simulan con "project" = status o campo extra
  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Agrupar tareas por proyecto (campo "project" opcional)
  const projectsMap = {};
  tasks.forEach(task => {
    const project = task.project || 'Default Project';
    if (!projectsMap[project]) projectsMap[project] = [];
    projectsMap[project].push(task);
  });

  return (
    <div>
      <h1>Projects</h1>
      {Object.keys(projectsMap).map(project => (
        <div key={project} style={{ marginBottom: '2rem' }}>
          <h2>{project}</h2>
          <TaskList tasks={projectsMap[project]} refresh={() => {}} />
        </div>
      ))}
    </div>
  );
}
