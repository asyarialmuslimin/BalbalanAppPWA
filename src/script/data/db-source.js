import {
    openDB
} from 'idb';

const dbName = "balbalan";
const dbVersion = 1;

const dbHandler = openDB(dbName, dbVersion, {
    upgrade(db) {
        const store = db.createObjectStore('team', {
            keyPath: 'id',
            autoIncrement: false
        });
        store.createIndex('name', 'name');
    }
});

class DBSource {

    static async searchData(data) {
        const db = await dbHandler;
        return db.getAllFromIndex('team', 'name', data);
    }

    static async createData(data) {
        const db = await dbHandler;

        const tx = db.transaction('team', 'readwrite');
        const store = tx.objectStore('team');
        store.add(data);
        return tx.complete;
    }

    static async readAll() {
        const db = await dbHandler;
        const tx = db.transaction('team', 'readonly');
        const store = tx.objectStore('team');
        const data = store.getAll();
        tx.complete;
        return data;
    }

    static async deleteData(id) {
        const db = await dbHandler;
        const tx = db.transaction('team', 'readwrite');
        const store = tx.objectStore('team');
        store.delete(parseInt(id));
        return tx.complete;
    }
}

export default DBSource;