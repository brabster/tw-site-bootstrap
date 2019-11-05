import React from "react"

import { Card, Container, Row, Col, Badge, ListGroup } from "react-bootstrap"

const formatDate = (isoDateStr) => new Date(isoDateStr).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })
const nextAvailable = (isoDateStr) => {
  const date = new Date(isoDateStr);
  return date.setMonth(date.getMonth() + 1)
}
const isFutureDate = (isoDateStr) => new Date(isoDateStr) > new Date();
const monthsBetweenIncl = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return 1 + end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
}

const availableFrom = ({ engagements: [{ end = 0 } = {},] }) => new Date(end);
const renderAvailableFrom = (person) => {
  const availableDate = availableFrom(person);
  return availableDate <= Date.now()
    ? <Badge variant="success">Available now</Badge>
    : <Badge variant="primary">Available {formatDate(nextAvailable(availableDate))}</Badge>
}

const clientInfo = ({ name, description, link }) => {
  const label = name || description;
  return link
    ? <a href={link}>{label}</a>
    : label
}

const LocationInfo = ({ location, remote }) =>
  <Container className="px-0 pt-3">
    Based in {location.city}, {location.countryCode}. {remote}
  </Container>

const Engagement = ({ engagement }) => {
  const { client, headline, highlights, agency, role, start, end, keywords } = engagement;

  return <Card className="mt-3">
    <Card.Header>
      {role} - {clientInfo(client)}
      <div className="lead">{headline}</div>
      <div>{`${formatDate(start)} - ${formatDate(end)} (${monthsBetweenIncl(start, end)} months${isFutureDate(end) ? ", projected" : ""})`}</div>
    </Card.Header>
    <Card.Body className="py-0 px-0">
      <Card.Text>
        <ListGroup variant="flush">
          {highlights && highlights.map(highlight =>
            <ListGroup.Item>{highlight}</ListGroup.Item>)}
        </ListGroup>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      {keywords.map(keyword =>
        <Badge className="mr-1" pill variant="primary">{keyword}</Badge>)}
    </Card.Footer>
  </Card>
}

export default ({ person }) => (
  <Container className="border shadow p-3">
    <Row className="pb-3">
      <Col>
        <Row className="pb-2">
          <Col><h3>{person.name} {renderAvailableFrom(person)}</h3></Col>
        </Row>
        <Row>
          <Col className="lead">{person.summary}</Col>
        </Row>
        <Row>
          <Col><LocationInfo location={person.location} remote={person.remote} /></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col>{person.engagements.map(engagement => <Engagement engagement={engagement} />)}</Col>
    </Row>
  </Container>
)
