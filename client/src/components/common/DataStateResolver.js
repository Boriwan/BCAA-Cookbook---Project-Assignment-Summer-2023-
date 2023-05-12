import LoadingPage from "../../pages/StatePages/LoadingPage";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function DataStateResolver(props) {
  if (!props.data || !props.data.state) {
    return <LoadingPage />;
  }

  switch (props.data.state) {
    case "ready":
      return props.children;
    case "error":
      return (
        <>
          <Container className="my-5">
            <Row>
              <Col>
                <h1 className="text-center">Error</h1>
                <p className="text-center">
                  {JSON.stringify(props.data.error, null, 2)}
                </p>
                <Button href="/" variant="primary" className="d-block mx-auto">
                  Domů
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      );
    default:
      return <LoadingPage />;
  }
}

export default DataStateResolver;
