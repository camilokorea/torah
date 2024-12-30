import React, { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/AuthProvider";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './LibroEditar.css';

const LibroEditar = () => {
    const { id } = useParams();

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Replace with your API endpoint
    const apiEndpoint = 'https://localhost:7116/api/Libro/get?id=' + id;

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setRecords(data);
                setLoading(false);

                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const auth = useAuth();
    return (
        <div className="libro-editar-wrapper">
            <Container>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col md={10}>
                                    <h1>Bienvenido! {auth.user}</h1>
                                    <h2>Sistema administrador Torah en Linea</h2>
                                    <h2>{ id }</h2>
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
                        <p>test</p>
                    </Col>
                </Row>
            </Container>
        </div>
  );
}

export default LibroEditar;