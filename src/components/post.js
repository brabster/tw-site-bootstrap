import React from "react"

import { Container, Row, Col } from "react-bootstrap"

import FrontMatter from "./frontmatter"

const Post = ({ frontmatter, html }) => (
  <Container>
    <Row>
      <FrontMatter frontmatter={frontmatter} />
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

export default Post
