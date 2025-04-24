import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DedicatoriaComponent({ dedicatoria }) {
    return (
        <>
            <h1>Dedicatoria</h1>
            <p>{dedicatoria?.contenido}</p>
        </>
    );
}

export default DedicatoriaComponent;