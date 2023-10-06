import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function GetCitas() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/calendario_citas`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data)
            })
    }, [])

    const setData = (data) => {
        let { _id, usuario_id, profesional_id, fecha_cita, tipo_cita } = data;
        localStorage.setItem('ID', _id);
        localStorage.setItem('UsuarioID', usuario_id);
        localStorage.setItem('ProfesionalID', profesional_id);
        localStorage.setItem('FechaCita', fecha_cita);
        localStorage.setItem('TipoCita', tipo_cita);
    }

    const getData = () => {
        axios.get(`http://localhost:5001/API/calendario_citas`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onDelete = (_id) => {
        axios.delete(`http://localhost:5001/API/del/calendario_citas/${_id}`)
            .then(() => {
                getData()
            })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Usuario ID</Table.HeaderCell>
                        <Table.HeaderCell>Profesional ID</Table.HeaderCell>
                        <Table.HeaderCell>Fecha Cita</Table.HeaderCell>
                        <Table.HeaderCell>Tipo Cita</Table.HeaderCell>
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
                                    <Table.Cell>{data.profesional_id}</Table.Cell>
                                    <Table.Cell>{data.fecha_cita}</Table.Cell>
                                    <Table.Cell>{data.tipo_cita}</Table.Cell>

                                    <Link to='/Update/UpdateCitas'>
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