import { openDB } from 'idb';
import { DATABASE_NAME, DATABASE_VERSION, STORE_NAME } from "../config";

export const isIndexedDBSupported = () => {
    if (!('indexedDB' in window)) {
        console.error('IndexedDB not supported');
        return false;
    }    
}
export const getDataBaseInstance = async() => {
    try {
        return await openDB(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(db) {
                db.createObjectStore(STORE_NAME, { keyPath: "location_name"});
            }
        });
    }
    catch(error){
        console.error('Oh!! It failed due to -> ', error);
    }
}

class DatabaseService {

    addLocation = async(location) => {
        try { 
            const db = await getDataBaseInstance();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(location);
            await tx.done;
        } catch(error){
            console.error('Oh!! It failed due to -> ', error);
        }
    }
    getAllLocations = async() => {
        try {
            const db = await getDataBaseInstance();
            return await db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll()
        } catch(error) {
            console.error('Oh!! It failed due to -> ', error);
        }
    }
    getLocation = async(location) => {
        try {
            const db = await getDataBaseInstance();
            return await db.transaction(STORE_NAME).objectStore(STORE_NAME).get(location);
        } catch(error) {
            console.error('Oh!! It failed due to -> ', error);
        }
    }
    deleteLocation = async(location) => {
        try {
            const db = await getDataBaseInstance();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(location);
            await tx.done;
        } catch(error) {
            console.error('Oh!! It failed due to -> ', error);
        }
    }  
}
  
export const IndexedDBService = new DatabaseService();
