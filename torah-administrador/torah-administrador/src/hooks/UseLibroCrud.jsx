import { useState, useEffect } from 'react';

// URL base del API
const API_URL = 'https://localhost:7116/api/Libro/';

// Custom Hook
export const UseLibroCrud = () => {
  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCrud, setLoadingCrud] = useState(false);
  const [errorLibro, setErrorLibro] = useState(null);
  const [errorLibros, setErrorLibros] = useState(null);

  // Obtener todos los libros
  const fetchLibros = async () => {
    setLoading(true);
    setErrorLibros(null);
    try {
      const response = await fetch(API_URL + 'list');

      if (!response.ok) {
        setErrorLibros('Se produjo un error al tratar de obtener la lista de libros de la Torah');
      } else {
        const data = await response.json();
        setLibros(data);
      }
    } catch (err) {
      setErrorLibros(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener libro
  const fetchLibro = async (id) => {
    setLoading(true);
    setErrorLibro(null);
    try {
      const response = await fetch(API_URL + 'get?id=' + id);

      if (!response.ok) {
        setErrorLibro('Error obteniendo datos del libro');
      } else {
        const data = await response.json();
        setLibro(data);
      }
    } catch (err) {
      setErrorLibro(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un libro existente
  const actualizarNombre = async (id, nombre) => {
    setLoadingCrud(true);
    setError(null);
    try {
      const response = await fetch(API_URL + 'actualizar/nombre', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            id: id,
            nombre: nombre
          }),
      });

      if (!response.ok) {
        setError('Se produjo un error al tratar de actualizar el nombre de libro.');
      } else {
        setError(null);
        setLibro((prev) => {
          prev.nombre = nombre;
          return prev;
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCrud(false);
    }
  };

  return {
    libros,
    libro,
    loading,
    loadingCrud,
    errorLibro,
    errorLibros,
    fetchLibros,
    fetchLibro,
    actualizarNombre
  };
};
