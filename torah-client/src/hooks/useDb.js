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
    const [torah, setTorah] = useState([]);
    const [version, setVersion] = useState(null);
    const [loadingDb, setLoadingDb] = useState(false);
    const [errorDb, setErrorDb] = useState(null);
    const [dataBaseInitialized, setDataBaseInitialized] = useState(false);

    const initIndexedDb = async () => {
        setErrorDb(null);
        setLoadingDb(true);

        try {
            setLoadingDb(false);
            setDataBaseInitialized(true);

            return openDB(db.DB_NAME, 1, {
                upgrade(dbObject) {
                    if (!dbObject.objectStoreNames.contains(db.stores.torah.name)) {
                        dbObject.createObjectStore(db.stores.torah.name, { keyPath: 'id' });
                    }

                    if (!dbObject.objectStoreNames.contains(db.stores.version.name)) {
                        dbObject.createObjectStore(db.stores.version.name, { keyPath: 'id' });
                    }
                },
            });
        }
        catch (e) {
            setErrorDb(e.message);
            setLoadingDb(false);
            return null;
        }
    };

    const initDB = async () => {
        if (!db.dbInstance) {
            db.dbInstance = await initIndexedDb();
        }
    };

    const queryTorah = async () => {
        setErrorDb(null);
        setLoadingDb(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.torah.name, 'readonly');
            const store = tx.objectStore(db.stores.torah.name);
            let response = await store.getAll();
            setTorah(response);
            setLoadingDb(false);
        }
        catch (e) {
            setErrorDb(e.message);
            setLoadingDb(false);
        }
    };

    const queryVersion = async () => {
        setErrorDb(null);
        setLoadingDb(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.version.name, 'readonly');
            const store = tx.objectStore(db.stores.version.name);
            const dbResult = await store.getAll();
            setVersion(dbResult ? dbResult[0] : null);
            setLoadingDb(false);
        }
        catch (e) {
            setErrorDb(e.message);
            setLoadingDb(false);
        }
    };

    const insertLibro = async (libro) => {
        setErrorDb(null);
        setLoadingDb(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.torah.name, 'readwrite');
            const store = tx.objectStore(db.stores.torah.name);
            store.put(libro);
            await tx.done;
        }
        catch (e) {
            setErrorDb(e.message);
            setLoadingDb(false);
        }
    };

    const insertUltimaVersion = async (ultimaVersion) => {
        setErrorDb(null);
        setLoadingDb(true);

        try {
            await initDB();
            const tx = db.dbInstance.transaction(db.stores.version.name, 'readwrite');
            const store = tx.objectStore(db.stores.version.name);
            store.put(ultimaVersion);
            await tx.done;
        }
        catch (e) {
            setErrorDb(e.message);
            setLoadingDb(false);
        }
    };

    return {
        torah,
        version,
        loadingDb,
        errorDb,
        dataBaseInitialized,
        queryTorah,
        queryVersion,
        insertLibro,
        insertUltimaVersion
    };
};
