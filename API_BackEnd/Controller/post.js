import dotenv from 'dotenv';
dotenv.config();
import { client } from "../Connection/ConnectionDB.js";
const db = client.db("salud");

async function postData(collectionName, data){
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { postData };