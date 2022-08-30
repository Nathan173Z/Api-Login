import React, {useContext} from 'react';

import { Context } from '../../../Context/AuthContext'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'

export const NavBar = () =>{

    const { authenticated, handleLogout } = useContext(Context)

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Sistema Frontend</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/categorias">Categorias</Nav.Link>
                    <Nav.Link href="/products">Produtos</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Button variant="outline-warning" onClick={handleLogout}>Sair</Button>
                </Form>                
                </Container>
            </Navbar>  
        </>
    )
}