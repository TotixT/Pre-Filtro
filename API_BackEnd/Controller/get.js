import dotenv from 'dotenv';
dotenv.config();
import { client } from "../Connection/ConnectionDB.js";
const db = client.db("salud");

async function getData(collectionName, query){
    try {
        const collection = db.collection(collectionName);
        const result = await collection.find(query).toArray();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { getData };