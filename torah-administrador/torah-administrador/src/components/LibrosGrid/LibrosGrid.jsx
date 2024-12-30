import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LibrosGrid = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Replace with your API endpoint
    const apiEndpoint = 'https://localhost:7116/api/Libro/list';

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
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (<p>Cargando...</p>) : 
            (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Prefijo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id}>
                                <td>
                                    <Link to={`/libro/${record.id}`}>{record.nombre}</Link>
                                </td>
                                <td>{record.abreviacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default LibrosGrid;
