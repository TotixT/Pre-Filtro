import dotenv from 'dotenv';
dotenv.config();
import { client } from "../Connection/ConnectionDB.js";
import { ObjectId } from 'mongodb';
const db = client.db("salud");

async function updateData(collectionName, itemId, newData){
    try {
        const collection = db.collection(collectionName);
        const filter = { _id: new ObjectId(itemId) };
        const update = { $set: newData };
        const result = await collection.updateOne(filter, update);

        if (result.matchedCount === 0) {
          throw new Error(`Elemento con ID ${itemId} no encontrado en ${collectionName}`);
        }
    
        return newData;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { updateData };