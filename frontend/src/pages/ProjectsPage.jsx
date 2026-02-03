import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { api } from '../api';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function ProjectsPage({ sidebarOnly }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/projects').then(res => {
      setProjects(res.data);
      if (!selected) setSelected(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (selected && !sidebarOnly) {
      api.get(`/tasks?projectId=${selected._id}`)
        .then(res => setTasks(res.data));
    }
  }, [selected]);

  if (sidebarOnly) {
    return (
      <Sidebar
        projects={projects}
        selectedId={selected?._id}
        onSelect={setSelected}
      />
    );
  }

  if (!selected) return <div>Selecciona un proyecto</div>;

  return (
    <>
      <h4>{selected.name}</h4>

      <TaskForm
        projectId={selected._id}
        onCreated={() =>
          api.get(`/tasks?projectId=${selected._id}`)
            .then(res => setTasks(res.data))
        }
      />

      <TaskList
        tasks={tasks}
        refresh={() =>
          api.get(`/tasks?projectId=${selected._id}`)
            .then(res => setTasks(res.data))
        }
      />

    </>
  );
}
