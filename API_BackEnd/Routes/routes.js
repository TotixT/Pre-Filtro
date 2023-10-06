import { Router } from "express";
const router = Router();
import { getData } from "../Controller/get.js";
import { postData } from '../Controller/post.js';
import { updateData } from '../Controller/update.js';
import { deleteData } from '../Controller/delete.js';

router.get('/:collectionName', async(req, res) => {
    const { collectionName } = req.params;
    try {
        const result = await getData(collectionName, {});
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: `Error al obtener ${collectionName}`})
    }
});

router.post('/add/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    const data = req.body;
    try {
        const result = await postData(collectionName, data);
        res.status(201).json({result, data});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: `Error al obtener ${collectionName}`})
    }
})

router.put('/upd/:collectionName/:itemId', async (req, res) => {
    const { collectionName, itemId } = req.params;
    const newData = req.body;
  
    try {
      const result = await updateData(collectionName, itemId, newData);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: `Error al actualizar el elemento de ${collectionName}` });
    }
  });

  router.delete('/del/:collectionName/:itemId', async (req, res) => {
    const { collectionName, itemId } = req.params;
    try {
      const result = await deleteData(collectionName, itemId);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: `Error al deletear el elemento de ${collectionName}` });
    }
});

export default router;