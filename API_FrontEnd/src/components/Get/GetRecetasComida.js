import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function GetRecetasComida() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/recetas_planes_comida`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data)
            })
    }, [])

    const setData = (data) => {
        let { _id, nombre, ingredientes, instrucciones } = data;
        localStorage.setItem('ID', _id);
        localStorage.setItem('Nombre', nombre);
        localStorage.setItem('Ingredientes', ingredientes);
        localStorage.setItem('Instrucciones', instrucciones);
    }

    const getData = () => {
        axios.get(`http://localhost:5001/API/recetas_planes_comida`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onDelete = (_id) => {
        axios.delete(`http://localhost:5001/API/del/recetas_planes_comida/${_id}`)
            .then(() => {
                getData()
            })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Ingredientes</Table.HeaderCell>
                        <Table.HeaderCell>Instrucciones</Table.HeaderCell>
                        <Table.HeaderCell>Actualizar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {
                        APIData.map((data) => {
                            return (

                                <Table.Row>
                                    <Table.Cell>{data.nombre}</Table.Cell>
                                    <Table.Cell>{data.ingredientes}</Table.Cell>
                                    <Table.Cell>{data.instrucciones}</Table.Cell>

                                    <Link to='/Update/UpdateRecetasComida'>
                                        <Table.Cell>
                                            <Button onClick={() => setData(data)}>Actualizar</Button>
                                        </Table.Cell>
                                    </Link>

                                    <Table.Cell>
                                        <Button onClick={() => onDelete(data._id)}>Eliminar</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }

                </Table.Body>
            </Table>
        </div>
    )
}