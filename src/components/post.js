import React from "react"

import { Container, Row, Col } from "react-bootstrap"

import FrontMatter from "./frontmatter"

export default ({ frontmatter, html, fields }) => (
  <Container className="shadow rounded">
    <Row>
      <FrontMatter frontmatter={frontmatter} fields={fields} />
    </Row>
    <Row>
      <Col>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Col>
    </Row>
  </Container>
)
