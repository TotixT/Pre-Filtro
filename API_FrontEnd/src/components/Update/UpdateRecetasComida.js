import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import '../../App.css'

export default function UpdateRecetasComida() {
    let history = useHistory();
    const [_id, setID] = useState(null);
    const [nombre, setNombre] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [instrucciones, setInstrucciones] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setNombre(localStorage.getItem('Nombre'));
        setIngredientes(localStorage.getItem('Ingredientes'));
        setInstrucciones(localStorage.getItem('Instrucciones'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:5001/API/upd/recetas_planes_comida/${_id}`, {
            nombre, ingredientes, instrucciones
        }).then(() => {
            history.push('/Get/GetRecetasComida');
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
                            <input placeholder="Ingredientes" type='text' value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Instrucciones" type='text' value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} className="textInput" />
                        </div>
                    </Form.Field>

                    <Button type="submit" onClick={updateAPIData}>Actualizar</Button>
                </Form>
            </div>
        </div>
    )
}