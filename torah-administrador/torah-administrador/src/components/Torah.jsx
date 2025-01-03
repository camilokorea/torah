import React, { useEffect } from 'react';
import { Table, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { UseLibroCrud } from '../hooks/UseLibroCrud';

const Torah = () => {
    const {
        libros,
        loading,
        errorLibros,
        fetchLibros
    } = UseLibroCrud();

    useEffect(() => {
        if (errorLibros) {
            toast.error(errorLibros, { position: "bottom-right" });
        }
    }, [errorLibros]);

    useEffect(() => {
        fetchLibros();
    }, []);

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <ToastContainer />
                {loading ? (<Spinner animation="border" variant="primary" />) :
                    (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Prefijo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {libros.map((libro) => (
                                    <tr key={libro.id}>
                                        <td>
                                            <Link to={`/libro/${libro.id}`}>{libro.nombre}</Link>
                                        </td>
                                        <td>{libro.abreviacion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
            </Row>
        </Container>
    );
};

export default Torah;
