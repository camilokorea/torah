// src/components/AuthenticatedLayout.js
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row, Col, Nav, Button, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Help from './Help';

const AuthenticatedLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { logout } = useAuth(); // Consumimos el contexto

    return (
        <Container fluid>
            <Row>
                {/* Botón de menú hamburguesa en móviles */}
                <Button
                    variant="primary"
                    className="d-md-none mb-2"
                    onClick={() => setShowSidebar(true)}
                >
                    Menú
                </Button>

                {/* Menú lateral responsivo */}
                <Offcanvas
                    show={showSidebar}
                    onHide={() => setShowSidebar(false)}
                    className="d-md-none"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <Nav.Link as={NavLink} to="/" end onClick={() => setShowSidebar(false)}>
                                Inicio
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/profile" onClick={() => setShowSidebar(false)}>
                                Perfil
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/settings" onClick={() => setShowSidebar(false)}>
                                Configuración
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/help" onClick={() => setShowSidebar(false)}>
                                Ayuda
                            </Nav.Link>
                            <Button variant="danger" onClick={logout} className="mt-3">
                                Cerrar Sesión
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Menú lateral para pantallas grandes */}
                <Col xs={3} sm={3} md={2} lg={2} className="bg-light vh-100 d-none d-md-block">
                    <Nav className="flex-column p-3">
                        <Nav.Link as={NavLink} to="/" end>
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">
                            Perfil
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/settings">
                            Configuración
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/help">
                            Ayuda
                        </Nav.Link>
                        <Button variant="danger" onClick={logout} className="mt-3">
                            Cerrar Sesión
                        </Button>
                    </Nav>
                </Col>

                {/* Contenido principal */}
                <Col xs={12} sm={12} md={10} lg={10} className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/help" element={<Help />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthenticatedLayout;
