import TaskItem from './TaskItem';

export default function TaskList({ tasks }) {
  if (!tasks.length) return <p>No hay tareas</p>;

  return (
    <>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task}/>
      ))}
    </>
  );
}
