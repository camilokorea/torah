import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { UseLibroCrud } from '../hooks/UseLibroCrud';

const Home = () => {
    const {
        libros,
        loading,
        error
    } = UseLibroCrud();

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-right" });
        }
    }, [error]);

    return (
        <div className="libros-grid-wrapper">
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
        </div>
    );
};

export default Home;
