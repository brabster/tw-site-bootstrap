import React from "react"
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (

    <div className="container post-container">
      <div className="p-2 row">
        <div className="col text-center">
          <h1>{frontmatter.title}</h1>
        </div>
      </div>
      <div className="p-2 row">
        <div className="col-sm-3">
          <div className="card author-card">
            <div className="card-title">Paul Brabban</div>
            <div className="card-subtitle">Tech Consultant</div>
            email linkedin twitter
          </div>
          <p className="text-muted">{frontmatter.date}</p>
        </div>
        <div className="col-sm-9">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`