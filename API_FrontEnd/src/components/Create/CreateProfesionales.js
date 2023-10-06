import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";

export default function CreateProfesionales() {
    let history = useHistory();
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [direccion_clinica, setDireccionClinica] = useState('');
    const [telefono, setTelefono] = useState('');

    const postData = () => {
        axios.post(`http://localhost:5001/API/add/info_profesionales/`, {
            nombre, especialidad, direccion_clinica, telefono
        }).then(() => {
            history.push('/Get/GetProfesionales');
        });
    }

    return (
        <div className="card-container">
            <div className="card">
                <Form className="create-form">
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Nombre" type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Especialidad" type='text' value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Direccion Clinica" type='text' value={direccion_clinica} onChange={(e) => setDireccionClinica(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Telefono" type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={postData}>Crear</Button>
                </Form>
            </div>
        </div>
    )
}