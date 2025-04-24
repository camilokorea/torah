import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LibrosGridComponent from './LibrosGridComponent';

function BibliaComponent({librosAntiguoTestamento, librosNuevoTestamento, testamentos}) {
    const [selectedTestamento, setSelectedTestamento] = useState(null);

    const switchTestamento = (testamento) => {
        setSelectedTestamento(testamento);
    };

    return (
        <>
            <div className='Biblia-container'>
                <div className="d-flex justify-content-center my-4 w-100">
                    <ButtonGroup size="lg" className='w-100'>
                        {testamentos?.map((testamento, indexTestamento) => (
                            <Button variant="primary" className="w-50" key={indexTestamento} onClick={() => switchTestamento(testamento)}>{testamento}</Button>
                        ))}
                    </ButtonGroup>
                </div>
                {
                    selectedTestamento == librosAntiguoTestamento[0]?.testamento ?
                        (
                            <LibrosGridComponent items={librosAntiguoTestamento} />
                        ) : (
                            <LibrosGridComponent items={librosNuevoTestamento} />
                        )
                }
            </div>
        </>
    );
}

export default BibliaComponent;
