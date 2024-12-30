import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import './Dashboard.css';
import LibrosGrid from '../LibrosGrid/LibrosGrid';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
    const auth = useAuth();
    return (
        <div className="dashboard-wrapper">
            <Container>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col md={10}>
                                    <h1>Bienvenido! {auth.user}</h1>
                                    <h2>Sistema administrador Torah en Linea</h2>                                                                
                                </Col>
                                <Col md={2}>
                                    <button onClick={() => auth.logOut()} className="btn-submit">
                                        Cerrar sesion
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LibrosGrid></LibrosGrid>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;