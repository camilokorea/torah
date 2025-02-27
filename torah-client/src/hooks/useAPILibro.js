import { useState } from 'react';
import { useHttpCodes } from './useHttpCodes';

const API_URL = 'https://localhost:7116/api/Libro/';

export const useApiLibro = () => {
    const {
        codigosHttp
    } = useHttpCodes();

    const [libros, setLibros] = useState([]);
    const [loadingLibros, setLoadingLibros] = useState(false);
    const [errorLibros, setErrorLibros] = useState(null);

    const fetchLibros = async () => {
        setLoadingLibros(true);
        setErrorLibros(null);
        try {
            const response = await fetch(API_URL + 'get/torah');

            if (!response.ok) {
                setErrorLibros('Se produjo un error al tratar de obtener la lista de libros de la Torah: ' + response.status + ' ' + codigosHttp[response.status]);
            } else {
                const data = await response.json();
                setLibros(data);
            }
        } catch (err) {
            setErrorLibros(err.message);
        } finally {
            setLoadingLibros(false);
        }
    };

    return {
        loadingLibros,
        errorLibros,
        libros,
        fetchLibros
    };
};
