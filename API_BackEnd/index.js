import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

// Routers
import routerGeneral from './Routes/routes.js';
import routerUsuario from './Routes/usuario.router.js';
// import routerCalendario_citas from './Router/calendario_cita.router.js';
// import routerInfo_profesionales from './Router/info_profesional.router.js';
// import routerDiario_alimenticio from './Router/diario_alimenticio.router.js';
// import routerRecetas_planes_comida from './Router/receta.router.js';
// import routerActividad_fisica from './Router/actividad_fisica.router.js';
// import routerConexiones from './Router/conexion.router.js';
// import routerHistorial_medico from './Router/historial_medico.router.js';
// import routerMedicion_salud from './Router/medicion_salud.router.js';
// import routerMetas_salud from './Router/metas_salud.router.js';

import { Connection } from './Connection/ConnectionDB.js'
import swaggerUI from "swagger-ui-express";
import swaggerDocument from './Swagger/swagger.json' assert {type: "json"}

Connection();

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204, 
  };
  
app.use(cors(corsOptions));
  
// CRUD's
app.use('/API', routerGeneral);
app.use("/api-doc/",swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/usuario', routerUsuario);
// app.use('/citas', routerCalendario_citas);
// app.use('/profesionales', routerInfo_profesionales);
// app.use('/diario', routerDiario_alimenticio);
// app.use('/recetas', routerRecetas_planes_comida);
// app.use('/act_fisica', routerActividad_fisica);
// app.use('/conexiones', routerConexiones);
// app.use('/historial', routerHistorial_medico);
// app.use('/medicion', routerMedicion_salud);
// app.use('/metas', routerMetas_salud);

app.listen(port, () => {
    console.log(`El Server esta prendido en el puerto: ${port}`);
})