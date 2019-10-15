import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Company = () => (
  <Layout pageInfo={{ pageName: "company" }}>
    <SEO title="Company" />
    <h1>Paul Brabban, Tempered Works</h1>
    <p>This is the services page</p>
    <p><strong>Tempered Works Ltd.</strong> is registered in England with company number 11372276 and VAT number 296417076.</p>
    <p>The registered address is:<br/>
      First Floor,<br/>
      Telecom House,<br/>
      125-135 Preston Road,<br/>
      Brighton,<br/>
      BN1 6AF</p>
  </Layout>
)

export default Company
