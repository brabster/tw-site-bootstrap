import React from "react"

import { Card, Container, Row, Col, Badge, ListGroup, Button } from "react-bootstrap"
import { FaTwitter, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { graphql, Link } from "gatsby";

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

const EngagementDetails = ({ engagement: { highlights } }) => (
    <ListGroup variant="flush" className="py-0 px-0">
      {highlights && highlights.map(highlight =>
        <ListGroup.Item key={highlight}>{highlight}</ListGroup.Item>)}
    </ListGroup>
);

const Engagement = ({ engagement, showDetails }) => {
  const { client, headline, role, start, end, keywords } = engagement;

  return (
    <Card className="mt-2 border">
      <Card.Header>
        {role} - {clientInfo(client)}
        <div className="mt-2 lead">{headline}</div>
        <div className="mt-2">{`${formatDate(start)} - ${formatDate(end)} (${monthsBetweenIncl(start, end)} months${isFutureDate(end) ? " - projected" : ""})`}</div>
        <div className="mt-1">{keywords.map(keyword => <Badge className="mr-1" variant="dark" key={keyword}>{keyword}</Badge>)}</div>
      </Card.Header>
      <Card.Body className="p-0">
          {showDetails ? <EngagementDetails engagement={engagement} /> : <></>}
      </Card.Body>
    </Card>
  )
}

const pickTagForNetwork = network => {
  const networkLc = network.toLowerCase();
  if (networkLc === 'linkedin') { return <FaLinkedin /> }
  else if (networkLc === 'github') { return <FaGithub /> }
  else if (networkLc === 'twitter') { return <FaTwitter /> }
  return <></>;
}

const SocialContacts = ({ profiles }) => (
  <>
    {profiles.map(({ network, url }) =>
      <a key={network} className='ml-2 clickable-over-stretched' href={url} target='_blank' rel='noopener noreferrer'>{pickTagForNetwork(network)}</a>)}
  </>
)

const Qualification = ({ qualification }) => {
  const { institution, title, start, end } = qualification;
  return (
    <>
      <span className="lead mr-2">{title}</span>
      <span className="mr-2">{institution}</span>
      {start && <span>{start} - {end}</span>}
    </>
  )
}

export default ({ person, showDetails }) => (
  <Container className="border shadow p-3">
    <Row className="pb-3">
      <Col>
        <Row className="pb-2">
          <Col>
            <h3>
              {person.name}
            </h3>
          </Col>
          <Col className='lead text-right'>
            <div>
              <a className='clickable-over-stretched' href={`mailto:${person.email}`}><FaPaperPlane /></a><SocialContacts profiles={person.profiles} />
            </div>
            <div>
              {renderAvailableFrom(person)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="lead">{person.summary.lead}</Col>
        </Row>
        {showDetails && (
          <Row className="mt-2">
            <Col>{person.summary.more}</Col>
          </Row>
        )}
      </Col>
    </Row>
    <Row>
      <Col>
        <h3>Engagements</h3>
        {person.engagements.map(engagement =>
          <Engagement key={engagement.start} engagement={engagement} showDetails={showDetails} />)}
      </Col>
    </Row>
    {
      showDetails ? (
        <>
          <Row>
            <Col>
              <h3 className="mt-3">Qualifications</h3>
              <ListGroup>
                {person.qualifications.map(q => <ListGroup.Item key={q.title}><Qualification qualification={q} /></ListGroup.Item>)}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="pt-2"><LocationInfo location={person.location} remote={person.remote} /></Col>
          </Row>
        </>
      ) : (
          <Link className='stretched-link' to={`/people/${person.id}`}>
            <Row>
              <Col className='text-center mt-2'><Button>Full CV</Button></Col>
            </Row>
          </Link>
        )
    }
  </Container >
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
    email
    summary {
      lead
      more
    }
    remote
    profiles {
      network
      username
      url
    }
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
    qualifications {
      institution
      title
      start
      end
    }
  }
`
