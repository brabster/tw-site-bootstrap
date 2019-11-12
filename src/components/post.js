import React from "react"

import { Container, Row, Col } from "react-bootstrap"

import FrontMatter from "./frontmatter"
import PostFooter from './PostFooter'

export default ({ frontmatter, html, fields }) => (
  <Container className="shadow rounded">
    <Row>
      <Col>
        <FrontMatter frontmatter={frontmatter} fields={fields} />
      </Col>
    </Row>
    <Row>
      <Col>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <PostFooter frontmatter={frontmatter} fields={fields} />
      </Col>
    </Row>
  </Container>
)
