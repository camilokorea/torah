import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function GlosarioComponent({ glosario }) {
    return (
        <>
            <p>{glosario?.contenido}</p>
        </>
    );
}

export default GlosarioComponent;