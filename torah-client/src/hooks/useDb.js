import { useState } from 'react';
import { openDB } from 'idb';

const db = {
    dbInstance: null,
    DB_NAME: 'torah-client-db',
    stores:
    {
        torah:
        {
            name: 'torah'
        },
        version: {
            name: 'version'
        }
    }
};

export const useDb = () => {
    const [torah, setTorah] = useState(null);
    const [version, setVersion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initIndexedDb = async () => {
        setError(null);
        setLoading(true);

        try {
            return openDB(db.DB_NAME, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(db.stores.torah.name)) {
                        db.createObjectStore(db.stores.torah.name, { keyPath: 'id' });
                    }

                    if (!db.objectStoreNames.contains(db.stores.version.name)) {
                        db.createObjectStore(db.stores.version.name, { keyPath: 'id' });
                    }

                    setLoading(false);
                },
            });
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
            return null;
        }
    };

    const initDB = async () => {
        if (!db.dbInstance) {
            db.dbInstance = await initIndexedDb();
        }
    };

    const queryTorah = async () => {
        setError(null);
        setLoading(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.torah.name, 'readonly');
            const store = tx.objectStore(db.stores.torah.name);
            setTorah(store.getAll());
            setLoading(false);
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    const queryVersion = async () => {
        setError(null);
        setLoading(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.version.name, 'readonly');
            const store = tx.objectStore(db.stores.version.name);
            setVersion(store.getAll());
            setLoading(false);
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    const insertLibro = async (libro) => {
        setError(null);
        setLoading(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.torah.name, 'readwrite');
            const store = tx.objectStore(db.stores.torah.name);
            store.put(libro);
            await tx.done;
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    return {
        torah,
        version,
        loading,
        error,
        queryTorah,
        queryVersion,
        insertLibro
    };
};
