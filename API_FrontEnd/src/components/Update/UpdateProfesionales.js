import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import '../../App.css'

export default function UpdateProfesionales() {
    let history = useHistory();
    const [_id, setID] = useState(null);
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [direccion_clinica, setDireccionClinica] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setNombre(localStorage.getItem('Nombre'));
        setEspecialidad(localStorage.getItem('Especialidad'));
        setDireccionClinica(localStorage.getItem('Direccion'));
        setTelefono(localStorage.getItem('Telefono'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:5001/API/upd/info_profesionales/${_id}`, {
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
                            <input placeholder="Especialidad" type='text' value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Direccion Clinica" type='text' value={direccion_clinica} onChange={(e) => setDireccionClinica(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Telefono" type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={updateAPIData}>Actualizar</Button>
                </Form>
            </div>
        </div>
    )
}