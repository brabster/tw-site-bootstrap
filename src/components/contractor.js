import React from "react"

import { Card, Container, Row, Col, Badge, ListGroup } from "react-bootstrap"

const availableFrom = ({ engagements: [{ end = 0 } = {},] }) => new Date(end);
const renderAvailableFrom = (person) => {
  const availableDate = availableFrom(person);
  return availableDate <= Date.now()
    ? <Badge pill variant="success">Available now</Badge>
    : <Badge pill variant="primary">Available {availableDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}</Badge>
}

const clientInfo = ({ name, description, link }) => {
  const label = name || description;
  return link
    ? <a href={link}>{label}</a>
    : label
}

export default ({ person }) => (
  <Container className="border shadow p-3">
    <Row className="pb-3">
      <Col>
        <Row className="pb-2">
          <Col><h2>{person.name}</h2></Col>
          <Col className="text-right">{renderAvailableFrom(person)}</Col>
        </Row>
        <Row>
          <Col className="lead">{person.summary}</Col>
        </Row>
        <Row>
          <Col>Based in {person.location.city}, {person.location.countryCode}</Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col>{person.engagements.map(({ client, headline, highlights, agency, role, start, end, keywords }) => (
        <Card className="mt-3">
          <Card.Header>
            {role} - {clientInfo(client)}
            <div className="lead">{headline}</div>
          </Card.Header>
          <Card.Body className="py-0 px-2">
            <Card.Text>
              <ListGroup variant="flush">
                {highlights && highlights.map(highlight =>
                  <ListGroup.Item>{highlight}</ListGroup.Item>)}
              </ListGroup>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {keywords.map(keyword =>
              <Badge pill variant="primary">{keyword}</Badge>)}
          </Card.Footer>
        </Card>
      ))}</Col>
    </Row>
  </Container>
)
