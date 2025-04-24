import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function GlosarioComponent({ glosario }) {
    return (
        <>
            <h1>Glosario</h1>
            <p>{glosario?.contenido}</p>
        </>
    );
}

export default GlosarioComponent;