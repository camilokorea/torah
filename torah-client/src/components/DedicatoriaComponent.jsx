import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DedicatoriaComponent({ dedicatoria }) {
    return (
        <>
            <p>{dedicatoria?.contenido}</p>
        </>
    );
}

export default DedicatoriaComponent;