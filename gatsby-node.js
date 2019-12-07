const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`)

const dateFromSlug = slug => {
  const [year, month, date] = slug.replace("/", "").split("-");
  return new Date(year, month, date);
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: `/posts${slug}`,
    }),
      createNodeField({
        node,
        name: `date`,
        value: dateFromSlug(slug),
      })
    return;
  }
  if (node.internal.type === `PeopleYaml`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/people/${node.id}`,
    })
    return;
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const markdownResult = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  markdownResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  });

  const peopleResult = await graphql(`
    query {
      allPeopleYaml {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  peopleResult.data.allPeopleYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/contractor.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  });
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
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
