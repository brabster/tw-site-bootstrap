import { StaticQuery, graphql } from "gatsby"
import React from "react"

import { ListGroup } from "react-bootstrap"

import PostTeaser from "./postTeaser"

const PostList = () => (
  <StaticQuery
    query={graphql`
      query Posts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 10
        ) {
          edges {
            node {
              excerpt
              timeToRead
              frontmatter {
                path
                title
                description
                category
                tags
                date(formatString: "MMMM DD, YYYY")
                path
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ListGroup className="p-0">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <ListGroup.Item className="pt-0 pb-4 px-0 border-0">
            <PostTeaser
              frontmatter={node.frontmatter}
              excerpt={node.excerpt} />
          </ListGroup.Item>
        ))}
      </ListGroup>)}
  />
)

export default PostList
