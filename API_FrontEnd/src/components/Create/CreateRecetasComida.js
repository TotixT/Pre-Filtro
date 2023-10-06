import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "semantic-ui-react";

export default function CreateRecetasComida() {
    let history = useHistory();
    const [nombre, setNombre] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [instrucciones, setInstrucciones] = useState('');

    const postData = () => {
        axios.post(`http://localhost:5001/API/add/recetas_planes_comida/`, {
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
                            <input placeholder="Nombre" type='text' value={nombre} onChange={(e) => setNombre(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Ingredientes" type='text' value={ingredientes} onChange={(e) => setIngredientes(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <div className="textInputWrapper">
                            <input placeholder="Instrucciones" type='text' value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)}  className="textInput" />
                        </div>
                    </Form.Field>

                    <Button type="submit" onClick={postData}>Crear</Button>
                </Form>
            </div>
        </div>
    )
}