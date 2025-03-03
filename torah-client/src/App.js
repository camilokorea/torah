import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDb } from './hooks/useDb';
import { useApiLibro } from './hooks/useAPILibro';
import { useApiVersion } from './hooks/useAPIVersion';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [data, setData] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const {
    torah,
    version,
    setVersion,
    loadingDb,
    loadingDbLibros,
    loadingDbVersion,
    loadingDbInsertVersion,
    loadingDbInsertarLibro,
    errorDb,
    queryTorah,
    queryVersion,
    insertLibro,
    insertUltimaVersion
  } = useDb();

  const {
    lastVersion,
    loadingVersion,
    errorVersion,
    fetchUltimaVersion
  } = useApiVersion();

  const {
    loadingLibros,
    errorLibros,
    libros,
    fetchLibros
  } = useApiLibro();

  const updateOnlineStatus = async () => {
    setIsOnline(navigator.onLine);

    if (navigator.onLine) {
      await queryVersion();
    }
  };

  useEffect(() => {
    async function initialLoad() {
      await queryVersion();
      await queryTorah();
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }

    initialLoad();
  }, []);

  useEffect(() => {
    if (torah) {
      if (torah.length > 0) {
        setData(torah);
      } else {
        if (isOnline === true) {
          fetchLibros();
        }
      }
    }
  }, [torah]);

  useEffect(() => {
    if (loadingDbVersion) {
      toast.info("Cargando datos de version instalada en dispositivo", { position: "bottom-right" });
    }
  }, [loadingDbVersion]);

  useEffect(() => {
    if (loadingLibros) {
      toast.info("Cargando datos de version en el servidor", { position: "bottom-right" });
    }
  }, [loadingLibros]);

  useEffect(() => {
    if (loadingDbLibros) {
      toast.info("Cargando de la Torah instalada en dispositivo", { position: "bottom-right" });
    }
  }, [loadingDbLibros]);

  useEffect(() => {
    if (loadingDb) {
      toast.info("Inicializando base de datos en dispositivo", { position: "bottom-right" });
    }
  }, [loadingDb]);

  useEffect(() => {
    if (loadingVersion) {
      toast.info("Inicializando base de datos en dispositivo", { position: "bottom-right" });
    }
  }, [loadingVersion]);

  useEffect(() => {
    if (errorLibros) {
      toast.error("Hubo un problema cargando los datos de la Torah del servidor", { position: "bottom-right" });
    }
  }, [errorLibros]);

  useEffect(() => {
    if (errorVersion) {
      toast.error("Hubo un problema cargando datos de la ultima version en el servidor", { position: "bottom-right" });
    }
  }, [errorVersion]);

  useEffect(() => {
    if (loadingDbInsertVersion) {
      toast.info("Salvando datos de version en dispositivo", { position: "bottom-right" });
    }
  }, [loadingDbInsertVersion]);

  useEffect(() => {
    if (loadingDbInsertarLibro) {
      toast.info("Salvando datos de Torah descargados en dispositivo", { position: "bottom-right" });
    }
  }, [loadingDbInsertarLibro]);

  useEffect(() => {
    if (errorDb) {
      toast.error("Error de aplicacion: " + errorDb, { position: "bottom-right" });
    }
  }, [errorDb]);

  useEffect(() => {
    if (version !== false) {
      if (isOnline === true) {
        fetchUltimaVersion();
      }
    }
  }, [version]);

  useMemo(async () => {
    if (lastVersion !== null) {
      if (version === undefined) {
        await insertUltimaVersion(lastVersion);
        setVersion(lastVersion);
      }
      if (version) {
        if (version.version < lastVersion.version) {
          await insertUltimaVersion(lastVersion);
          setVersion(lastVersion);
          if (isOnline === true) {
            await fetchLibros();
          }
        }
      }
    }
  }, [lastVersion]);

  useMemo(async () => {
    libros.forEach(item => {
      insertLibro(item);
    });

    await queryTorah();
  }, [libros]);

  return (
    <div className="app">
      <ToastContainer />
      <header className="app-header">
        <h1>Torah Client</h1>
        <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
        <p>Version: {version?.version}</p>
      </header>
      <main>
        {
          data.length > 0 ?
            (
              <ul>
                {data.map(item => (<li key={item.id}>{item.nombre}</li>))}
              </ul>
            )
            :
            (
              <p>No data</p>
            )
        }
      </main>
    </div>
  );
}

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(registration => console.log('ServiceWorker registered: ', registration))
      .catch(error => console.log('ServiceWorker registration failed: ', error));
  });
}

export default App;
