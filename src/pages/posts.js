import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/postList"

export default () => (
  <Layout pageInfo={{ pageName: "posts" }}>
    <SEO title="Home" keywords={[`consulting`]} />
    <Container>
      <Row className="justify-content-center">
        <Col>
          <PostList />
        </Col>
      </Row>
    </Container>
  </Layout>
)
