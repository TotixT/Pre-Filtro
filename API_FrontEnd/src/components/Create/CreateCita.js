import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";
import '../../App.css'

export default function CreateCita() {
    let history = useHistory();
    const [usuario_id, setUsuarioId] = useState('');
    const [profesional_id, setProfesionalId] = useState('');
    const [fecha_cita, setFechaCita] = useState('');
    const [tipo_cita, setTipoCita] = useState('');

    const postData = () => {
        axios.post(`http://localhost:5001/API/add/calendario_citas/`, {
            usuario_id, profesional_id, fecha_cita, tipo_cita
        }).then(() => {
            history.push('/Get/GetCitas');
        });
    }

    return (
        <div className="card-container">
            <div className="card">
                <Form className="create-form">
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Id Del Usuario" type='text' value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Id del Profesional" type='text' value={profesional_id} onChange={(e) => setProfesionalId(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Fecha Cita" type='text' value={fecha_cita} onChange={(e) => setFechaCita(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Tipo Cita" type='text' value={tipo_cita} onChange={(e) => setTipoCita(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={postData}>Crear</Button>
                </Form>
            </div>
        </div>
    )
}