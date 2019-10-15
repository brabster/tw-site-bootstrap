import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar variant="dark" expand="md" id="site-navbar">
        <Link to="/" className="link-no-style">
          <Navbar.Brand>
            <Container>
              <Row>
                <Col>tempered.works</Col>
              </Row>
            </Container>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav activeKey={pageInfo && pageInfo.pageName}>
            {[
              ["Blog", "/"],
              ["Company", "/company"],
              ["Contact", "/contact"]
            ].map(([page, link]) => 
              <Link to={link} className="link-no-style">
                <Nav.Link className="text-right" as="span" eventKey={page}>{page}</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default CustomNavbar
