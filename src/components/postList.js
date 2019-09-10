import { Link, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { ListGroup } from "react-bootstrap"

import PostTeaser from "./postTeaser"

const PostList = ({  }) => (
  <StaticQuery
    query={graphql`
      query Posts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 10
        ) {
          edges {
            node {
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
      <ListGroup>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <ListGroup.Item>
            <PostTeaser
              link={node.frontmatter.path}
              title={node.frontmatter.title}
              publishDate={node.frontmatter.date}
              category={node.frontmatter.category}
              author="Paul"
              teaserText={node.frontmatter.description}/>
          </ListGroup.Item>
        ))}
      </ListGroup>)}
  />
)

PostList.propTypes = {
}

PostList.defaultProps = {
}

export default PostList
