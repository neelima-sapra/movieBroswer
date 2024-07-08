import React from "react"
import { Container, Navbar } from "react-bootstrap"

export default function Header() {
  return (
    <header className="App-header">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Acharya Prashant</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  )
}
