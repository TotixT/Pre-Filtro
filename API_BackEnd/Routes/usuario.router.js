import { Router } from "express";
import {    getAllUsuario, 
            getUsuarioById, 
            createUsuario, 
            updateUsuario, 
            deleteUsuario 
        } from "../Controller/usuario.controller.js";

const router = Router();

router.get("/All", getAllUsuario);
router.get("/One/:id", getUsuarioById);
router.post("/Create", createUsuario);
router.put("/Update/:id", updateUsuario);
router.delete("/Delete/:id", deleteUsuario);

export default router;