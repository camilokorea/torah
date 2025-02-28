import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDb } from './hooks/useDb';
import { useApiLibro } from './hooks/useAPILibro';
import { useApiVersion } from './hooks/useAPIVersion';

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
    dataBaseInitialized,
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
        fetchLibros();
      }
    }
  }, [torah]);

  useEffect(() => {
    if(version !== false) {
      fetchUltimaVersion();
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
          await fetchLibros();
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
