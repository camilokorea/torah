import React, { useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { UseLibroCrud } from '../hooks/UseLibroCrud';
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { FaPencilAlt } from 'react-icons/fa';

const Libro = () => {
    const { id } = useParams();

    const {
        libro,
        loading,
        error,
        fetchLibro
    } = UseLibroCrud();

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-right" });
        }
    }, [error]);

    useEffect(() => {
        fetchLibro(id);
    }, []);

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <ToastContainer />
                {loading ? (<Spinner animation="border" variant="primary" />) :
                    (
                        <Container>
                            <Row>
                                <Container>
                                    <Row className="d-flex justify-content-left align-items-left">
                                        <Col xs={3} sm={2} md={2} lg={1}>
                                            <Button variant="primary" size="sm">
                                                <FaPencilAlt />
                                            </Button>
                                        </Col>
                                        <Col xs={9} sm={10} md={10} lg={11}>
                                            <h4>{libro?.nombre}</h4>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-left align-items-left">
                                        <Col xs={3} sm={2} md={2} lg={1}>
                                            <Button variant="primary" size="sm">
                                                <FaPencilAlt />
                                            </Button>
                                        </Col>
                                        <Col xs={9} sm={10} md={10} lg={11}>
                                            <p>Abreviatura: {libro?.abreviacion}</p>
                                        </Col>
                                    </Row>
                                </Container>
                                <h3>Capítulos</h3>
                                <Accordion defaultActiveKey="0">
                                    {libro?.capitulos.map((capitulo, indexCapitulo) => (
                                        <Accordion.Item eventKey={indexCapitulo.toString()} key={capitulo.capituloNumero}>
                                            <Accordion.Header>Capítulo {capitulo.capituloNumero}</Accordion.Header>
                                            <Accordion.Body>
                                                {capitulo.versiculos.map((versiculo, indexVersiculo) => (
                                                    <Container key={indexVersiculo.toString()}>
                                                        <Row className="d-flex justify-content-left align-items-left">
                                                            <Col xs={3} sm={2} md={2} lg={1}>
                                                                <Button variant="primary" size="sm">
                                                                    <FaPencilAlt />
                                                                </Button>
                                                            </Col>
                                                            <Col xs={9} sm={10} md={10} lg={11}>
                                                                <p className='hover-text'>{versiculo}</p>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Row>
                        </Container>
                    )}
            </Row>
        </Container>
    );
};

export default Libro;
