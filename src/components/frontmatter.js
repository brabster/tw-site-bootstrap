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
      <Row>
        <Col>
          <p className="lead">{lead}</p>
        </Col>
      </Row>
    </>
  )
}
