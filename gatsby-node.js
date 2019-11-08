const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = path.dirname(node.fileAbsolutePath).split(path.sep).pop();
    console.log(slug);
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }`,
    `type Frontmatter {
      author: PeopleYaml @link
    }`
  ]
  createTypes(typeDefs)
}
