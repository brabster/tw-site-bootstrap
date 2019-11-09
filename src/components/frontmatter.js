import React from "react"

import { Container, Row, Col } from "react-bootstrap"

export default ({ frontmatter, fields: { date } }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>{frontmatter.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{frontmatter.author.name} - {date}</p>
        </Col>
      </Row>
    </Container>
  )
}
