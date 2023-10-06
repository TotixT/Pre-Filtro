import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function GetProfesionales() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/info_profesionales`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data)
            })
    }, [])

    const setData = (data) => {
        let { _id, nombre, especialidad, direccion_clinica, telefono } = data;
        localStorage.setItem('ID', _id);
        localStorage.setItem('Nombre', nombre);
        localStorage.setItem('Especialidad', especialidad);
        localStorage.setItem('Direccion', direccion_clinica);
        localStorage.setItem('Telefono', telefono);
    }

    const getData = () => {
        axios.get(`http://localhost:5001/API/info_profesionales`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onDelete = (_id) => {
        axios.delete(`http://localhost:5001/API/del/info_profesionales/${_id}`)
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
                        <Table.HeaderCell>Especialidad</Table.HeaderCell>
                        <Table.HeaderCell>Direccion</Table.HeaderCell>
                        <Table.HeaderCell>Telefono</Table.HeaderCell>
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
                                    <Table.Cell>{data.especialidad}</Table.Cell>
                                    <Table.Cell>{data.direccion_clinica}</Table.Cell>
                                    <Table.Cell>{data.telefono}</Table.Cell>

                                    <Link to='/Update/UpdateProfesionales'>
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