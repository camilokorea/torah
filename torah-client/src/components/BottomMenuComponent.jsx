import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';

const BottomMenuComponent = ({ onSelect, version, isOnline }) => {
    return (
        <Navbar fixed="bottom" bg="light" variant="light" className="border-top py-2">
            <Container className="d-flex justify-content-between align-items-center">
                {/* Menú de navegación */}
                <Nav className="gap-3">
                    <Nav.Link onClick={() => onSelect('/')}>📖 Biblia</Nav.Link>
                    <Nav.Link onClick={() => onSelect('/dedicatoria')}>💌 Dedicatoria</Nav.Link>
                    <Nav.Link onClick={() => onSelect('/glosario')}>📚 Glosario</Nav.Link>
                </Nav>

                {/* Estado y versión */}
                <div className="d-flex align-items-center gap-3 text-muted small">
                    <span>
                        <CircleFill
                            size={10}
                            color={isOnline ? 'green' : 'red'}
                            className="me-1"
                        />
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                    <span>v{version}</span>
                </div>
            </Container>
        </Navbar>
    );
};

export default BottomMenuComponent;
