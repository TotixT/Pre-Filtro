import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
async function Connection(){
    try {
        await client.connect();
        console.log("Conexion Exitosa con la BD que guarda todo.");
    } catch (error) {
        console.log(error);
    }
};

export { Connection, client }