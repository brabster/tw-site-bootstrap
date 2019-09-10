import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { Card } from "react-bootstrap"

const PostTeaser = ({ title, publishDate, author, teaserText, tags, category, link }) => (
    <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Subtitle>{author} | {category} | {publishDate}</Card.Subtitle>
        <Card.Text>{teaserText} <Link to={link}>...read more</Link></Card.Text>
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
