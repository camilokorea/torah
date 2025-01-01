import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LibroEditor.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const LibroEditor = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiEndpoint = 'https://localhost:7116/api/Libro/get?id=' + id;

    useEffect(() => {
        fetch(apiEndpoint)
            .then((response) => {
                if (!response.ok) {
                    toast.error("La respuesta de la red no fue la correcta", { position: "bottom-right" });
                    setLoading(false);
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);

                console.log(data);
            })
            .catch((error) => {
                toast.error("Error obteniendo respuesta del servidor: " + JSON.stringify(error), { position: "bottom-right" });
                setLoading(false);
            });
    }, []);

    return (
        <div className="libro-editor-wrapper">
            <ToastContainer />
            {loading ? (<Spinner animation="border" variant="primary" />) :
                (
                    <div>test</div>
                )}
        </div>
    );
};

export default LibroEditor;
