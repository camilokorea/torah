import { useState } from 'react';
import { useHttpCodes } from './useHttpCodes';

const API_URL = 'https://localhost:7116/api/VersionControlador/';

export const useApiVersion = () => {
    const {
        codigosHttp
    } = useHttpCodes();

    const [lastVersion, setLastVersion] = useState(null);
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
                setLastVersion(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        lastVersion,
        loading,
        error,
        fetchUltimaVersion
    };
};
