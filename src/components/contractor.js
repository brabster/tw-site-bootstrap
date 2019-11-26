import React from "react"

import { Card, Container, Row, Col, Badge, ListGroup, Accordion } from "react-bootstrap"
import { graphql } from "gatsby";

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
  const { client, headline, highlights, role, start, end, keywords } = engagement;

  return (
    <Card className="mt-3">
      <Accordion.Toggle as={Card.Header} eventKey={start}>
        {role} - {clientInfo(client)}
        <div className="mt-2 lead">{headline}</div>
        <div className="mt-2">{`${formatDate(start)} - ${formatDate(end)} (${monthsBetweenIncl(start, end)} months${isFutureDate(end) ? " - projected" : ""})`}</div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={start}>
        <Card.Body className="py-0 px-0">
          <ListGroup variant="flush">
            {highlights && highlights.map(highlight =>
              <ListGroup.Item key={highlight}>{highlight}</ListGroup.Item>)}
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
      <Card.Footer className="border-bottom-2">
        {keywords.map(keyword =>
          <Badge className="mr-1" pill variant="primary" key={keyword}>{keyword}</Badge>)}
      </Card.Footer>
    </Card>
  )
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
          <Col className="pt-2"><LocationInfo location={person.location} remote={person.remote} /></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col>
        <Accordion>
          {person.engagements.map(engagement => <Engagement key={engagement.start} engagement={engagement} />)}
        </Accordion>
      </Col>
    </Row>
  </Container>
)

export const query = graphql`
  fragment ContractorFragment on PeopleYaml {
    id
    label
    location {
      region
      countryCode
      city
    }
    name
    summary
    remote
    engagements {
      client {
        name
        description
        link
      }
      agency
      role
      start
      end
      keywords
      headline
      highlights
    }
  }
`
