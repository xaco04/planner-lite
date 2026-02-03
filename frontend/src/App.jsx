import { Container, Row, Col } from 'react-bootstrap';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-light vh-100 p-0">
          {/* Sidebar */}
          <ProjectsPage sidebarOnly />
        </Col>

        <Col md={9} lg={10} className="p-3">
          <ProjectsPage />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
