import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectsPage from "./pages/ProjectsPage";
import { api } from "./api";

function App() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/projects").then(res => {
      setProjects(res.data);
      if (!selected && res.data.length) setSelected(res.data[0]);
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-light vh-100 p-0">
          <ProjectsPage
            sidebarOnly
            projects={projects}
            selected={selected}
            setSelected={setSelected}
            setProjects={setProjects}  
          />
        </Col>

        <Col md={9} lg={10} className="p-3">
          <ProjectsPage
            projects={projects}
            selected={selected}
            setSelected={setSelected}
            setProjects={setProjects} 
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
