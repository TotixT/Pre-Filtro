import dotenv from 'dotenv';
dotenv.config();
import { client } from "../Connection/ConnectionDB.js";
import { ObjectId } from 'mongodb';
const db = client.db("salud");

async function deleteData(collectionName, itemId){
    try {
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndDelete({ _id: new ObjectId(itemId) });

        if (result.value) {
            return { message: `Elemento con ID ${itemId} no encontrado en ${collectionName}` };
          }
          else{
            return {message: `Elemento con ID ${itemId} eliminado correctamente`}
          }
      
          return result.value;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { deleteData };