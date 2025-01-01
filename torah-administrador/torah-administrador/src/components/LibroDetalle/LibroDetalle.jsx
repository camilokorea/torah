import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './LibroDetalle.css';
import NavBar from '../NavBar/NavBar';
import LibroEditor from '../LibroEditor/LibroEditor';

const LibroDetalle = () => {
    return (
        <div className="libro-detalle-wrapper">
            <Container>
                <Row>
                    <Col>
                        <NavBar></NavBar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LibroEditor></LibroEditor>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LibroDetalle;