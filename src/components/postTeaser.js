import { Link } from "gatsby"
import React from "react"

import { Card, Button } from "react-bootstrap"

const PostTeaser = ({ frontmatter: { date, path, title, category }, excerpt }) => (
  <Card>
    <Card.Header className="px-2 py-0 text-muted">
      {date}
      <Button className="text-uppercase" variant="link">{category}</Button>
    </Card.Header>
    <Link to={path} className="custom-card">
      <Card.Title className="px-2 py-0">{title}</Card.Title>
      <Card.Text className="px-2 py-0">
        {excerpt}
      </Card.Text>
    </Link>
    <Link to={path}><Card.Text className="px-2 py-0">read more</Card.Text></Link>
  </Card>
)

export default PostTeaser
