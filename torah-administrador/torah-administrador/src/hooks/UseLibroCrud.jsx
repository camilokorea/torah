import { useState, useEffect } from 'react';

// URL base del API
const API_URL = 'https://localhost:7116/api/Libro/';

// Custom Hook
export const UseLibroCrud = () => {
  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los libros
  const fetchLibros = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL + 'list');
      if (!response.ok) throw new Error('Error al obtener los libros');
      const data = await response.json();
      setLibros(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener libro
  const fetchLibro = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL + '/get?id=' + id);
      if (!response.ok) throw new Error('Error al obtener libro');
      const data = await response.json();
      setLibro(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un libro existente
  const updateLibro = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Error al actualizar el libro');
      const updatedLibro = await response.json();
      setLibros((prev) =>
        prev.map((libro) => (libro.id === id ? updatedLibro : libro))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch inicial de libros al montar el componente
  useEffect(() => {
    fetchLibros();
  }, []);

  return {
    libros,
    libro,
    loading,
    error,
    fetchLibros,
    fetchLibro,
    updateLibro
  };
};
