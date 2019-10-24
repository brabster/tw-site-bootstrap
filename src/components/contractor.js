import React from "react"

import { Card, Container, Row, Col, Button } from "react-bootstrap"

const formatAvailability = dateStr => new Date(dateStr).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })

export default ({ person }) => (
  <Container>
    <Row>
      <Col>
        <Card>
          <Card.Title>{person.name}</Card.Title>
          <Card.Text>
            {person.summary}
            <p>Based in {person.location.city}</p>
            <p>Expected Availability: {formatAvailability(person.available)}</p>
          </Card.Text>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>Recent Engagements</Col>
    </Row>
    <Row>
      <Col>{person.engagements.map(({ client, agency, role, start, end, keywords }) => (
        <Card>
          <Card.Header>{role} with {client}</Card.Header>
          <Card.Body>
            <Card.Text>
              {start} - {end} via {agency}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {keywords.map(keyword =>
              <Button variant="outline-primary" size="sm">{keyword}</Button>)}
          </Card.Footer>
        </Card>
      ))}</Col>
    </Row>
  </Container>
)
