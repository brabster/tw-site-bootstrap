import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Publications = () => (
  <Layout pageInfo={{ pageName: "publications" }}>
    <SEO title="Publications" />
    <h1>Publications Header</h1>
    <p>Publications content</p>
  </Layout>
)

export default Publications
