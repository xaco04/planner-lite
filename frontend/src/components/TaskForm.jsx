import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { api } from "../api";

export default function TaskForm({ projectId, onCreated }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/tasks", {
      title,
      priority,
      dueDate: dueDate || null,
      project: projectId, // aunque aún no lo filtres
    });

    setTitle("");
    setPriority(3);
    setDueDate("");

    onCreated?.();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={5}>
          <Form.Group>
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              placeholder="Nueva tarea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Fecha límite</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Button type="submit" className="w-100">
            Añadir
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
