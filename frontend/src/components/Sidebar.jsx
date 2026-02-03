import { useState, useRef, useEffect } from "react";
import { ListGroup, Form } from "react-bootstrap";
import { api } from "../api";

export default function Sidebar({ projects, selectedId, onSelect, setProjects }) {
  const [menu, setMenu] = useState(null); // {x, y, project?}
  const [newName, setNewName] = useState("");
  const menuRef = useRef();

  // Cerrar menú al hacer clic afuera
  useEffect(() => {
    const handleClick = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleContextMenu = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({
      x: e.pageX,
      y: e.pageY,
      project, // undefined si es “nuevo proyecto”
    });
  };

  const createProject = async () => {
    if (!newName.trim()) return;
    const res = await api.post("/projects", { name: newName });
    setProjects(prev => [...prev, res.data]); // agrega a la lista
    onSelect(res.data); // selecciona automáticamente
    setMenu(null);
    setNewName("");
  };

  const deleteProject = async (project) => {
    if (!project) return;
    await api.delete(`/projects/${project._id}`);
    setProjects(prev => prev.filter(p => p._id !== project._id)); // elimina de la lista
    if (selectedId === project._id) onSelect(null); // deselecciona si borramos el proyecto seleccionado
    setMenu(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <ListGroup variant="flush" className="mb-3">
        {projects.map(p => (
          <ListGroup.Item
            key={p._id}
            action
            active={p._id === selectedId}
            onClick={() => onSelect(p)}
            onContextMenu={e => handleContextMenu(e, p)}
          >
            {p.name}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Menú contextual */}
      {menu && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: menu.y,
            left: menu.x,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1000,
            padding: "0.5rem",
            minWidth: "150px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          {/* Crear proyecto siempre */}
          <div>
            <Form.Control
              size="sm"
              placeholder="Nuevo proyecto"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") createProject(); }}
              className="mb-2"
            />
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={createProject}
            >
              + Crear proyecto
            </div>
          </div>

          {/* Borrar proyecto si se hizo clic derecho sobre uno */}
          {menu.project && (
            <div
              style={{ cursor: "pointer", color: "red", marginTop: "0.5rem" }}
              onClick={() => deleteProject(menu.project)}
            >
              🗑 Borrar "{menu.project.name}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
