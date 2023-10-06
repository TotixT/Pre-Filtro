import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function GetDiarioAlimentacion() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/diario_alimentacion`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data)
            })
    }, [])

    const setData = (data) => {
        let { _id, usuario_id, alimentos_consumidos, fecha, recetas_consumidas } = data;
        localStorage.setItem('ID', _id);
        localStorage.setItem('UsuarioId', usuario_id);
        localStorage.setItem('AlientosConsumidos', alimentos_consumidos);
        localStorage.setItem('Fecha', fecha);
        localStorage.setItem('RecetasConsumidas', recetas_consumidas);
    }

    const getData = () => {
        axios.get(`http://localhost:5001/API/diario_alimentacion`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onDelete = (_id) => {
        axios.delete(`http://localhost:5001/API/del/diario_alimentacion/${_id}`)
            .then(() => {
                getData()
            })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Usuario Id</Table.HeaderCell>
                        <Table.HeaderCell>Alimentos Consumidos</Table.HeaderCell>
                        <Table.HeaderCell>Fecha</Table.HeaderCell>
                        <Table.HeaderCell>Recetas Consumidas</Table.HeaderCell>
                        <Table.HeaderCell>Actualizar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {
                        APIData.map((data) => {
                            return (

                                <Table.Row>
                                    <Table.Cell>{data.usuario_id}</Table.Cell>
                                    <Table.Cell>{data.alimentos_consumidos}</Table.Cell>
                                    <Table.Cell>{data.fecha}</Table.Cell>
                                    <Table.Cell>{data.recetas_consumidas}</Table.Cell>

                                    <Link to='/Update/UpdateDiarioAlimentacion'>
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