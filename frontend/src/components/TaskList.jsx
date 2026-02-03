import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refresh }) {
  if (!tasks.length) return <p>No hay tareas</p>;

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} refresh={refresh} />
      ))}
    </div>
  );
}
