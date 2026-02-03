import { useState } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { api } from "../api";

export default function Sidebar({ projects, selectedId, onSelect }) {
  const [name, setName] = useState("");

  const createProject = async () => {
    if (!name.trim()) return;
    const res = await api.post("/projects", { name });
    onSelect(res.data);
    setName("");
    window.location.reload(); // simple por ahora
  };

  return (
    <>
      <ListGroup variant="flush" className="mb-3">
        {projects.map(p => (
          <ListGroup.Item
            key={p._id}
            action
            active={p._id === selectedId}
            onClick={() => onSelect(p)}
          >
            {p.name}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form.Control
        placeholder="Nuevo proyecto"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-2"
      />

      <Button size="sm" onClick={createProject} className="w-100">
        + Crear proyecto
      </Button>
    </>
  );
}
