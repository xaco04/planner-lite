import { ListGroup } from 'react-bootstrap';

export default function Sidebar({ projects, selectedId, onSelect }) {
  return (
    <ListGroup variant="flush">
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
  );
}
