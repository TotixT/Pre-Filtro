import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import '../../App.css'

export default function UpdateUsuario() {
    let history = useHistory();
    const [_id, setID] = useState(null);
    const [nombre, setNombre] = useState("");
    const [correo_electronico, setCorreoElectronico] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [metas_salud, setMetasSalud] = useState("");
    const [historial_medico, setHistorialMedico] = useState("");
    const [conexiones, setConexiones] = useState("");

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setNombre(localStorage.getItem('Nombre'));
        setCorreoElectronico(localStorage.getItem('Correo Electronico'));
        setFechaNacimiento(localStorage.getItem('Fecha Nacimiento'));
        setMetasSalud(localStorage.getItem('Metas de Salud'));
        setHistorialMedico(localStorage.getItem('Historial Medico'));
        setConexiones(localStorage.getItem('Conexiones'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:5001/API/upd/usuario/${_id}`, {
            nombre, correo_electronico, fecha_nacimiento, metas_salud, historial_medico, conexiones
        }).then(() => {
            history.push('/');
        });
    }

    return (
        <div className="card-container">
            <div className="card">
                <Form className="create-form">
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Nombre" type='text' value={nombre} onChange={(e) => setNombre(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Apellido" type='text' value={correo_electronico} onChange={(e) => setCorreoElectronico(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Fecha Nacimiento" type='text' value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Metas Salud" type='text' value={metas_salud} onChange={(e) => setMetasSalud(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Historial Medico" type='text' value={historial_medico} onChange={(e) => setHistorialMedico(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Conexiones" type='text' value={conexiones} onChange={(e) => setConexiones(e.target.value)}   className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={updateAPIData}>Actualizar</Button>
                </Form>
            </div>
        </div>
    )
}