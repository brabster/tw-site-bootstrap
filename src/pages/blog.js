import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/postList"

const Blog = () => (
  <Layout pageInfo={{ pageName: "blog" }}>
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

export default Blog
