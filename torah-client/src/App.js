import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDb } from './hooks/useDb';
import { useApiLibro } from './hooks/useAPIVersion';
import { useAPIVersion } from './hooks/useAPIVersion';

function App() {
  const [data, setData] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const {
    torah,
    version,
    loadingDb,
    errorDb,
    queryTorah,
    queryVersion,
    insertLibro
  } = useDb();

  async function actualizarTorah() {
  }

  async function fetchDataAndStore() {
  }

  async function getStoredData() {
    await queryTorah();
  }

  useMemo(() => {
    console.log(torah);
    setData(torah);
  }, [torah]);

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
      .register('/service-worker.js')
      .then(registration => console.log('ServiceWorker registered: ', registration))
      .catch(error => console.log('ServiceWorker registration failed: ', error));
  });
}

export default App;
