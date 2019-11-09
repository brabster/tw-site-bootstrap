import { Link } from "gatsby"
import React from "react"

import { Card, Button } from "react-bootstrap"

const PostTeaser = ({
  fields: { date, slug },
  frontmatter: { title, category, author },
  excerpt
}) => (
  <Card className="shadow">
    <Card.Header className="px-2 py-0 text-muted">
      {date}
      <Button className="text-uppercase" variant="link">{category}</Button>
    </Card.Header>
    <Link to={slug} className="custom-card">
      <Card.Title className="px-2 py-0">{title}</Card.Title>
      <Card.Text className="px-2 py-0">
        {excerpt}
      </Card.Text>
    </Link>
    <Link to={slug}><Card.Text className="px-2 py-0">read more</Card.Text></Link>
  </Card>
)

export default PostTeaser
