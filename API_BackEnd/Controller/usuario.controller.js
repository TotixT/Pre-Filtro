import { ObjectId } from "mongodb";
import { client } from "../Connection/ConnectionDB.js";
const db = client.db("salud");
const usuario = db.collection("usuario");

async function getAllUsuario(req, res) {
    try {
        const usuarios = await usuario.aggregate([
            {
                $lookup: {
                    from: "metas_salud",
                    localField: "metas_salud",
                    foreignField: "_id",
                    as: "metas_salud"
                }
            },
            {
                $lookup: {
                    from: "historial_medico",
                    localField: "historial_medico",
                    foreignField: "_id",
                    as: "historial_medico"
                }
            },
            {
                $lookup: {
                    from: "conexiones_comunicaciones",
                    localField: "conexiones",
                    foreignField: "_id",
                    as: "conexiones"
                }
            }
        ]).toArray();

        res.json(usuarios);
    } catch (error) {
        console.error('Error al listar Usuarios', error);
        res.status(500).json({ mensaje: 'Error al listar Usuarios' });
    }
}

async function getUsuarioById(req, res) {
    try {
        const usuarios = await usuario.aggregate([
            {
                $match: { _id: new ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "metas_salud",
                    localField: "metas_salud",
                    foreignField: "_id",
                    as: "metas_salud"
                }
            },
            {
                $lookup: {
                    from: "historial_medico",
                    localField: "historial_medico",
                    foreignField: "_id",
                    as: "historial_medico"
                }
            },
            {
                $lookup: {
                    from: "conexiones_comunicaciones",
                    localField: "conexiones",
                    foreignField: "_id",
                    as: "conexiones"
                }
            }
        ]).toArray();

        res.json(usuarios);
    } catch (error) {
        console.error('Error al listar Usuarios', error);
        res.status(500).json({ mensaje: 'Error al listar Usuarios' });
    }
}

async function createUsuario(req, res) {
    try {
        const {
            nombre,
            correo_electronico,
            fecha_nacimiento,
            metas_salud,
            historial_medico,
            conexiones,
        } = req.body;

        // Asegurarse de que los IDs en las matrices estén en el formato correcto (ObjectId)
        const metasSaludIds = metas_salud.map((id) => new ObjectId(id));
        const historialMedicoId = new ObjectId(historial_medico);
        const conexionesIds = conexiones.map((id) => new ObjectId(id));

        // Crear el documento de usuario
        const nuevoUsuario = {
            nombre,
            correo_electronico,
            fecha_nacimiento: new Date(fecha_nacimiento),
            metas_salud: metasSaludIds,
            historial_medico: historialMedicoId,
            conexiones: conexionesIds,
        };

        // Insertar el nuevo usuario en la base de datos
        const resultado = await usuario.insertOne(nuevoUsuario);

        res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: resultado });

    } catch (error) {
        console.error('Error al crear el usuario', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
}

async function updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const {
        nombre,
        correo_electronico,
        fecha_nacimiento,
        metas_salud,
        historial_medico,
        conexiones,
    } = req.body;
  
      // Valida que los IDs de sucursal y automóviles sean válidos (deben ser objetos ObjectId)
      const metasSaludIds = metas_salud.map((id) => new ObjectId(id));
      const historialMedicoId = new ObjectId(historial_medico);
      const conexionesIds = conexiones.map((id) => new ObjectId(id));
  
      const resultado = await usuario.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            nombre,
            correo_electronico,
            fecha_nacimiento,
            metas_salud: metasSaludIds,
            historial_medico: historialMedicoId,
            conexiones: conexionesIds
          },
        }
      );
  
      if (resultado.matchedCount === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.json({ mensaje: 'Usuario actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar Usuario', error);
      res.status(500).json({ mensaje: 'Error al actualizar Usuario' });
    }
  }

  async function deleteUsuario(req, res) {
    try {
      const { id } = req.params;
  
      const resultado = await usuario.deleteOne({ _id: new ObjectId(id) });
  
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrada' });
      }
  
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Usuario', error);
      res.status(500).json({ mensaje: 'Error al eliminar el Usuario' });
    }
  }

export {
    getAllUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario 
}