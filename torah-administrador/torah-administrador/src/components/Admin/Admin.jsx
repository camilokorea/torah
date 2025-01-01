import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Container, Row, Col, Nav, Button, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


// Componentes para cada sección
const Home = () => <h2>Bienvenido a la página de Inicio</h2>;
const Profile = () => <h2>Perfil del Usuario</h2>;
const Settings = () => <h2>Configuración de la Aplicación</h2>;
const Help = () => <h2>Ayuda y Soporte</h2>;

const Admin = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            <Container fluid>
                <Row>
                    {/* Botón para menú hamburguesa en móviles */}
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
        </Router>
    );
};

export default Admin;