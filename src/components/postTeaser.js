import { Link } from "gatsby"
import React from "react"

import { Card, Badge } from "react-bootstrap"

const PostTeaser = ({
  fields: { date, slug },
  frontmatter: { title, category, author },
  excerpt
}) => (
  <Card className="shadow">
    <Card.Header className="px-2 py-0">
      {date}
      <Badge className="text-uppercase float-right">{category}</Badge>
    </Card.Header>
    <Link to={slug} className="custom-card">
      <Card.Title className="px-2 py-0">{title}</Card.Title>
      <Card.Text className="px-2 py-0">
        {excerpt} <Badge>read full post</Badge>
      </Card.Text>
    </Link>
  </Card>
)

export default PostTeaser
