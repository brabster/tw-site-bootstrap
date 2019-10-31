import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

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
              label
              location {
                region
                countryCode
                city
              }
              name
              summary
              engagements {
                client {
                  name
                  description
                  link
                }
                agency
                role
                start
                end
                keywords
                headline
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
          <Col className="lead">Consultancy in software development, data engineering, machine learning and related fields.</Col>
        </Row>
        <Row className="pt-4">
          <Col lg>
            {allPeopleYaml.edges.map(({ node }) => <Contractor person={node} />)}
          </Col>
          <Col>
            <Container className="border shadow">
              <Card className="mt-3 border-0">
                <Card.Body>
                  <p><strong>Tempered Works Ltd.</strong> is registered in England with company number 11372276 and VAT number 296417076.</p>
                  <p>The registered address is:<br />
                    First Floor,<br />
                    Telecom House,<br />
                    125-135 Preston Road,<br />
                    Brighton,<br />
                    BN1 6AF</p>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Company

