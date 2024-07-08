import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

export default function Header() {
  return (
    <header className="App-header">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Acharya Prashant</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="#home">Advanced Search</Nav.Link>
            </Nav>
            <Navbar.Text>Assignment: Movie Browser</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
