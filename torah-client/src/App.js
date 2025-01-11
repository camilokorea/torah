import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { openDB } from 'idb';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://localhost:7116/api/';
const DB_NAME = 'torah-client-db';
const TORAH_STORE = 'torah';
const VERSION_STORE = 'version';

let torah = [];
let db = null;

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TORAH_STORE)) {
        db.createObjectStore(TORAH_STORE, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(VERSION_STORE)) {
        db.createObjectStore(VERSION_STORE, { keyPath: 'id' });
      }
    },
  });
}

async function setLibro(item) {
  const response = await fetch(API_URL + 'Libro/get?id=' + item.id);

  const data = await response.json();

  torah.push(data);
}

async function actualizarTorah() {
  const response = await fetch(API_URL + 'Libro/list');
  if (!response.ok) throw new Error('Network response was not ok');

  const data = await response.json();

  const tx = db.transaction(TORAH_STORE, 'readwrite');

  const store = tx.objectStore(TORAH_STORE);

  data.forEach(setLibro);

  torah.forEach(item => store.put(item));

  await tx.done;
}

async function fetchDataAndStore() {
  db = await initDB();

  try {
    const response = await fetch(API_URL + 'VersionControlador/ultimaversion');

    const ultimaVersionData = await response.json();

    const localUltimaVersion = await getLocalUltimaVersion();

    if (localUltimaVersion.length < 1) {
      const tx = db.transaction(VERSION_STORE, 'readwrite');
      const store = tx.objectStore(VERSION_STORE);
      store.put(ultimaVersionData);
    } else {
      if (ultimaVersionData.version !== localUltimaVersion[0].version) {
        const tx = db.transaction(VERSION_STORE, 'readwrite');
        const store = tx.objectStore(VERSION_STORE);
        store.clear();
        store.put(ultimaVersionData);
        await tx.done;
      }
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

async function getLocalUltimaVersion() {
  const db = await initDB();
  const tx = db.transaction(VERSION_STORE, 'readonly');
  const store = tx.objectStore(VERSION_STORE);
  return store.getAll();
}

async function getStoredData() {
  const db = await initDB();
  const tx = db.transaction(TORAH_STORE, 'readonly');
  const store = tx.objectStore(TORAH_STORE);
  return store.getAll();
}

function App() {
  const [data, setData] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    (async () => {
      if (isOnline) await fetchDataAndStore();
      const storedData = await getStoredData();
      setData(storedData);
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
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.nombre}</li>
          ))}
        </ul>
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
