import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/postList"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container className="text-center">
      <Row>
        <Col>
          <p>
            Things
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col md="6">
          <PostList />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            This starter also includes a navbar that sticks to the top of the
            screen when the user scrolls past it, and a footer that stays at the
            bottom of the screen.
          </p>
          <p>
            For more documentation on these packages and how they work, please
            refer to the pages linked in the list above.
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
