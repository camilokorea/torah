import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { UseLibroCrud } from '../hooks/UseLibroCrud';
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Libro = () => {
    const { id } = useParams();
    const [showModalLibroTitulo, setShowModalLibroTitulo] = useState(false);
    const [libroTituloInputValue, setLibroTituloInputValue] = useState('');
    const hasFetched = useRef(false);
    const {
        libro,
        loading,
        loadingCrud,
        errorLibro,
        errorCrud,
        crudDone,
        fetchLibro,
        actualizarNombre
    } = UseLibroCrud();
    const handleCloseModalLibroTitulo = () => setShowModalLibroTitulo(false);
    const handleShowModalLibroTitulo = () => setShowModalLibroTitulo(true);

    const handleUpdateLibroTitulo = (e) => {
        e.preventDefault();
        actualizarNombre(libro?.id, libroTituloInputValue);
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchLibro(id);
            hasFetched.current = true;
        }
    }, []);

    useMemo(() => {
        if (errorLibro) {
            toast.error(errorLibro, { position: "bottom-right" });
        }
    }, [errorLibro]);

    useMemo(() => {
        if (libro?.nombre) {
            setLibroTituloInputValue(libro?.nombre);
        }
    }, [libro]);

    useMemo(() => {
        if (loadingCrud === true) {
            toast.info("Salvando cambios...", { position: "bottom-right" });
        }
    }, [loadingCrud]);

    useMemo(() => {
        if (errorCrud) {
            toast.error("Hubo un problema salvando el nombre de libro: " + errorCrud, { position: "bottom-right" });
        }
    }, [errorCrud]);

    useMemo(() => {
        if (crudDone === true) {
            toast.success("Nombre de libro salvado satisfactoriamente", { position: "bottom-right" });
            handleCloseModalLibroTitulo();
        }
    }, [crudDone]);

    const handleChangeLibroTituloInputValue = (e) => {
        setLibroTituloInputValue(e.target.value);
    };

    return (
        <div>
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
                                                <Button variant="primary" size="sm" onClick={handleShowModalLibroTitulo}>
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
                                                        <Container key={String(capitulo.capituloNumero) + '-' + String(indexVersiculo.toString())}>
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
            <Modal show={showModalLibroTitulo} onHide={handleCloseModalLibroTitulo}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar nombre de Libro bíblico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateLibroTitulo}>
                        <Form.Group className="mb-3" controlId="LibroNombreForm">
                            <Form.Label>Nombre de Libro</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={libroTituloInputValue || ""}
                                onChange={handleChangeLibroTituloInputValue}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" disabled={loadingCrud} onClick={handleCloseModalLibroTitulo}>
                        {!loadingCrud ? "Cerrar" : "Cargando"}
                        {loadingCrud ? (
                            <Spinner
                                style={{ width: "0.7rem", height: "0.7rem" }}
                                type="grow"
                                color="light"
                            />
                        ) : null}
                    </Button>
                    <Button variant="primary" onClick={handleUpdateLibroTitulo} disabled={loadingCrud}>
                        {!loadingCrud ? "Guardar Cambios" : "Cargando"}
                        {loadingCrud ? (
                            <Spinner
                                style={{ width: "0.7rem", height: "0.7rem" }}
                                type="grow"
                                color="light"
                            />
                        ) : null}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Libro;
