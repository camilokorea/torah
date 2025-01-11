import { useState } from 'react';
import { useHttpCodes } from './useHttpCodes';

// URL base del API
const API_URL = 'https://localhost:7116/api/VersionControlador/';

// Custom Hook
export const useApiVersion = () => {
    const {
        codigosHttp
    } = useHttpCodes();

    const [version, setVersion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUltimaVersion = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL + 'ultimaversion');

            if (!response.ok) {
                setError('Error obteniendo ultima version: ' + response.status + ' ' + codigosHttp[response.status]);
            } else {
                const data = await response.json();
                setVersion(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        version,
        loading,
        error,
        fetchUltimaVersion
    };
};
