import { useState } from 'react';
import { useHttpCodes } from './useHttpCodes';

const API_URL = 'https://localhost:7116/api/Libro/';

export const useApiLibro = () => {
    const {
        codigosHttp
    } = useHttpCodes();

    const [libros, setLibros] = useState([]);
    const [libro, setLibro] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLibros = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL + 'list');

            if (!response.ok) {
                setError('Se produjo un error al tratar de obtener la lista de libros de la Torah: ' + response.status + ' ' + codigosHttp[response.status]);
            } else {
                const data = await response.json();
                setLibros(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLibro = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL + 'get?id=' + id);

            if (!response.ok) {
                setError('Error obteniendo datos del libro: ' + response.status + ' ' + codigosHttp[response.status]);
            } else {
                const data = await response.json();
                setLibro(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        libros,
        libro,
        loading,
        error,
        fetchLibros,
        fetchLibro
    };
};
