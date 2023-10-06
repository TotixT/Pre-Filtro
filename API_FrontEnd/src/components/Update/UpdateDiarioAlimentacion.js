import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import '../../App.css'


export default function UpdateDiarioAlimentacion() {
    let history = useHistory();
    const [_id, setID] = useState(null);
    const [usuario_id, setUsuarioId] = useState('');
    const [alimentos_consumidos, setAlimentosConsumidos] = useState('');
    const [fecha, setFecha] = useState('');
    const [recetas_consumidas, setRecetasConsumidas] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setUsuarioId(localStorage.getItem('UsuarioId'));
        setAlimentosConsumidos(localStorage.getItem('AlientosConsumidos'));
        setFecha(localStorage.getItem('Fecha'));
        setRecetasConsumidas(localStorage.getItem('RecetasConsumidas'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:5001/API/upd/diario_alimentacion/${_id}`, {
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
                            <input placeholder="Usuario Id" type='text' value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Alimentos Consumidos" type='text' value={alimentos_consumidos} onChange={(e) => setAlimentosConsumidos(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Fecha" type='text' value={fecha} onChange={(e) => setFecha(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Recetas Consumidas" type='text' value={recetas_consumidas} onChange={(e) => setRecetasConsumidas(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Button type="submit" onClick={updateAPIData}>Actualizar</Button>
                </Form>
            </div>
        </div>
    )
}