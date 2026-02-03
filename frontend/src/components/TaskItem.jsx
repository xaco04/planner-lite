import { Button, Badge, ProgressBar } from "react-bootstrap";
import { api } from "../api";

export default function TaskItem({ task, refresh }) {

  const toggleStatus = async () => {
    const newStatus = task.status === "done" ? "pending" : "done";
    await api.put(`/tasks/${task._id}`, { status: newStatus });
    refresh?.();
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`);
    refresh?.();
  };

  const priorityColor = {
    1: "danger",
    2: "warning",
    3: "info",
    4: "secondary",
    5: "success",
  }[task.priority] || "primary";

  // progreso simple para el “timeline”
  const progressByStatus = {
    pending: 10,
    in_progress: 50,
    done: 100,
  };

  return (
    <div className="border rounded p-2 mb-2">
      <div className="d-flex justify-content-between align-items-center">
        <div onClick={toggleStatus} style={{ cursor: "pointer" }}>
          <strong>
            {task.status === "done" ? <s>{task.title}</s> : task.title}
          </strong>
          <Badge bg={priorityColor} className="ms-2">
            P{task.priority}
          </Badge>
          <Badge bg="secondary" className="ms-2">
            {task.status}
          </Badge>
        </div>

        <Button size="sm" variant="outline-danger" onClick={handleDelete}>
          Borrar
        </Button>
      </div>

      {task.dueDate && (
        <small className="text-muted">
          Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
        </small>
      )}

      <ProgressBar
        now={progressByStatus[task.status]}
        className="mt-2"
        style={{ height: "6px" }}
      />
    </div>
  );
}
