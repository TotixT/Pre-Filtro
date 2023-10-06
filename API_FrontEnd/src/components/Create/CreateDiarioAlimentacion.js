import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";

export default function CreateDiarioAlimentacion() {
    let history = useHistory();
    const [usuario_id, setUsuarioId] = useState('');
    const [alimentos_consumidos, setAlimentosConsumidos] = useState('');
    const [fecha, setFecha] = useState('');
    const [recetas_consumidas, setRecetasConsumidas] = useState('');

    const postData = () => {
        axios.post(`http://localhost:5001/API/add/diario_alimentacion/`, {
            usuario_id, alimentos_consumidos, fecha, recetas_consumidas
        }).then(() => {
            history.push('/Get/GetDiarioAlimentacion');
        });
    }

    return (
        <div className="card-container">
            <div className="card">
                <Form className="create-form">
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Nombre" type='text' value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Especialidad" type='text' value={alimentos_consumidos} onChange={(e) => setAlimentosConsumidos(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Direccion Clinica" type='text' value={fecha} onChange={(e) => setFecha(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Telefono" type='text' value={recetas_consumidas} onChange={(e) => setRecetasConsumidas(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={postData}>Crear</Button>
                </Form>
            </div>
        </div>
    )
}