import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ContextConfidence from "./ContextConfidence/ContextConfidence";
import Markets from "./Markets/Markets";
export default function VerticalTabs() {
  return (
    <>
      <Tab.Container transition={false} defaultActiveKey="second">
        <Row>
          <Col md="auto">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Markets</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Context Confidence</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Core Property</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Source selection</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Declarative Ranker</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Markets />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ContextConfidence />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
