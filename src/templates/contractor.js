import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Contractor from '../components/contractor'

export default ({ data }) => {
  return (
    <Layout pageInfo={{ pageName: `${data.peopleYaml.name}` }}>
      <Contractor person={data.peopleYaml} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
        peopleYaml(fields: {slug: {eq: $slug}}) {
        ...ContractorFragment
      }
    }
  `
