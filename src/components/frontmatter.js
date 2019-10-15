import React from "react"

import { Container, Row, Col } from "react-bootstrap"

const FrontMatter = ({ frontmatter }) => (
  <Container>
    <Row>
      <Col>
        <h1>{frontmatter.title}</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>Paul Brabban - {frontmatter.date}</p>
      </Col>
    </Row>
  </Container>
)

export default FrontMatter
