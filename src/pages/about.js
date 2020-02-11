import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Card } from 'react-bootstrap'

export default () => (
  <Layout pageInfo={{ pageName: "details" }}>
    <SEO title="Company Details for Tempered Works Ltd."/>
    <Card>
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
  </Layout>
)
