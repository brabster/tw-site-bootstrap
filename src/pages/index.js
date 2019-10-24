import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import { useStaticQuery, graphql } from "gatsby"

import Contractor from "../components/contractor"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Company = () => {
  const { allPeopleYaml } = useStaticQuery(
    graphql`
      query {
        allPeopleYaml {
          edges {
            node {
              id
              available
              label
              location {
                region
                countryCode
                city
              }
              name
              summary
              engagements {
                client
                agency
                role
                start
                end
                keywords
                highlights
              }
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
          <Col>Consultancy in software development, data engineering, machine learning and related fields.</Col>
        </Row>
        <Row>
          <Col lg>
            {allPeopleYaml.edges.map(({ node }) => <Contractor person={node} />)}
          </Col>
          <Col>
            <p><strong>Tempered Works Ltd.</strong> is registered in England with company number 11372276 and VAT number 296417076.</p>
            <p>The registered address is:<br />
              First Floor,<br />
              Telecom House,<br />
              125-135 Preston Road,<br />
              Brighton,<br />
              BN1 6AF</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Company

