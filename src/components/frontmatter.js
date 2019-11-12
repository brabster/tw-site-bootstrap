import React from "react"

import { Row, Col } from "react-bootstrap"

export default ({ frontmatter: { title, lead } }) => {
  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">{title}</h1>
        </Col>
      </Row>
      <hr />
      <Row className="mb-3">
        <Col className="lead text-center">{lead}</Col>
      </Row>
    </>
  )
}
