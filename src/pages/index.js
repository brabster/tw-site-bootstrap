import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import { useStaticQuery, graphql } from "gatsby"

import Contractor from "../components/contractor"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/Banner"

export default () => {
  const { allPeopleYaml } = useStaticQuery(
    graphql`
      query {
        allPeopleYaml {
          edges {
            node {
              ...ContractorFragment
            }
          }
        }
      }
    `
  )
  return (
    <Layout pageInfo={{ pageName: "company" }}>
      <SEO title="Tempered Works Ltd." />
      <Container>
        <Row>
          <Col>
            <Banner />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col lg>
            {allPeopleYaml.edges.map(({ node }) => <Contractor key={node.id} person={node} />)}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
