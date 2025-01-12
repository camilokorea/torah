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
    loadingDb,
    errorDb,
    dataBaseInitialized,
    queryTorah,
    queryVersion,
    insertLibro,
    insertUltimaVersion
  } = useDb();

  const {
    lastVersion,
    loading,
    error,
    fetchUltimaVersion
  } = useApiVersion();

  async function actualizarTorah() {
  }

  async function fetchDataAndStore() {
  }

  async function getStoredData() {
    await queryTorah();
    await queryVersion();
  }

  useMemo(() => {
    setData(torah);
  }, [torah]);

  useMemo(() => {
    if (dataBaseInitialized) {
      if (!version) {
        fetchUltimaVersion();
      }
    }
  }, [version, dataBaseInitialized]);

  useMemo(() => {
    if (dataBaseInitialized) {
      if (!version) {
        insertUltimaVersion(lastVersion);
      }
    }
  }, [lastVersion]);

  useMemo(() => {
    //console.log(loadingDb);
  }, [loadingDb]);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    (async () => {
      // if (isOnline) await fetchDataAndStore();
      await getStoredData();
    })();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Torah Client</h1>
        <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      </header>
      <main>
        {
          data ?
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
