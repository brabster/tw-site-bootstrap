import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { Card, Button } from "react-bootstrap"

const PostTeaser = ({ title, publishDate, author, excerpt, timeToRead, category, link }) => (
  <Card>
    <Card.Header className="px-2 py-0 text-muted">
      {publishDate}
      <Link to={`/categories/${category}`}>
        <Button className="text-uppercase" variant="link">{category}</Button>
      </Link>
    </Card.Header>
    <Link to={link} className="custom-card">
      <Card.Title className="px-2 py-0">{title}</Card.Title>
      <Card.Text className="px-2 py-0">
        {excerpt}
      </Card.Text>
    </Link>
    <Link to={link}><Card.Text className="px-2 py-0">read more</Card.Text></Link>
  </Card>
)

PostTeaser.propTypes = {
  title: PropTypes.string,
  publishDate: PropTypes.string,
  author: PropTypes.string,
  teaserText: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string,
}

PostTeaser.defaultProps = {
  siteTitle: ``,
  author: "Paul"
}

export default PostTeaser
