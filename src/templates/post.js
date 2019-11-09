import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"

export default ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, fields } = markdownRemark
  return (
    <Layout>
      <Post frontmatter={frontmatter} html={html} fields={fields} />
    </Layout>)
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
      html
      frontmatter {
        title
        author {
          name
        }
      }
    }
  }
`
