import React, { useEffect, useState, useMemo, useRef, use } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useDb } from '../hooks/useDb';
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

const LibroComponent = () => {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);

    const {
        torah,
        queryTorah,
        loadingDbLibros,
    } = useDb();

    useEffect(() => {
        queryTorah();
    }, []);

    useMemo(() => {
        if (torah) {
            if (torah.length > 0) {
                if (torah[0]) {
                    setLibro(torah[0].libros.filter(item => {
                        return item.id == id;
                    })[0]);
                }
            }
        }
    }, [torah]);

    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <ToastContainer />
                    {loadingDbLibros ? (<Spinner animation="border" variant="primary" />) :
                        (
                            <Container>
                                <Row>
                                    <Container>
                                        <Row className="d-flex justify-content-left align-items-left">
                                            <Col xs={9} sm={10} md={10} lg={11}>
                                                <h3>{libro?.nombre}</h3>
                                                <p>{libro?.testamento}</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Accordion defaultActiveKey="0">
                                        {libro?.capitulos.map((capitulo, indexCapitulo) => (
                                            <Accordion.Item eventKey={indexCapitulo.toString()} key={capitulo.capituloNumero}>
                                                <Accordion.Header>Capítulo {capitulo.capituloNumero}</Accordion.Header>
                                                <Accordion.Body>
                                                    {capitulo.versiculos.map((versiculo, indexVersiculo) => (
                                                        <Container key={String(capitulo.capituloNumero) + '-' + String(indexVersiculo.toString())}>
                                                            <Row className="d-flex justify-content-left align-items-left">
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
        </div>
    );
};

export default LibroComponent;
