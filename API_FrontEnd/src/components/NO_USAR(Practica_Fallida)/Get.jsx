import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css'

export default function Get() {
    const [APIData, setAPIData] = useState([]);
    const [collectionName, setCollectionName] = useState('usuario');

    useEffect(() => {
        fetchData();
    }, [collectionName]);

    const fetchData = () => {
        axios.get(`http://localhost:5001/API/${collectionName}`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
    }

    const setData = (data) => {
        localStorage.setItem('collectionName', collectionName);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                localStorage.setItem(key, data[key]);
            }
        }
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:5001/API/del/${collectionName}/${id}`)
            .then(() => {
                fetchData();
            })
    }

    let tableHeaders = [];
    let tableColumns = [];

    if (collectionName === 'usuario') {
        tableHeaders = ['Nombre', 'Correo Electronico', 'Fecha Nacimiento', 'Metas de Salud', 'Historial Medico', 'Conexiones'];
        tableColumns = ['nombre', 'correo_electronico', 'fecha_nacimiento', 'metas_salud', 'historial_medico', 'conexiones'];
    } else if (collectionName === 'calendario_citas') {
        tableHeaders = ['ID Del Usuario', 'ID Del Profesional', 'Fecha Cita', 'Tipo de Cita'];
        tableColumns = ['usuario_id', 'profesional_id', 'fecha_cita', 'tipo_cita'];
    } else if (collectionName === 'info_profesionales') {
        tableHeaders = ['Nombre', 'Especialidad', 'Direccion De La Clinica', 'Telefono'];
        tableColumns = ['nombre', 'especialidad', 'direccion_clinica', 'telefono'];
    } else if (collectionName === 'diario_alimentacion') {
        tableHeaders = ['ID Del Usuario', 'Alimentos Consumidos', 'Fecha Consumo', 'Recetas Consumidas'];
        tableColumns = ['usuario_id', 'alimentos_consumidos', 'fecha', 'recetas_consumidas'];
    } else if (collectionName === 'recetas_planes_comida') {
        tableHeaders = ['Nombre', 'Ingredientes', 'Instrucciones'];
        tableColumns = ['nombre', 'ingredientes', 'instrucciones'];
    }

    return (
        <div>
            <div className='mb-4'>
                <Button className='cambioRuta' onClick={() => setCollectionName('usuario')}>Usuarios</Button>
                <Button className='cambioRuta' onClick={() => setCollectionName('calendario_citas')}>Citas</Button>
                <Button className='cambioRuta' onClick={() => setCollectionName('info_profesionales')}>Profesionales</Button>
                <Button className='cambioRuta' onClick={() => setCollectionName('diario_alimentacion')}>Diario Alimentacion</Button>
                <Button className='cambioRuta' onClick={() => setCollectionName('recetas_planes_comida')}>Recetas</Button>
            </div>

            <Table className='custom-table'>
                <Table.Header>
                    <Table.Row>
                        {tableHeaders.map((header) => (
                            <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
                        ))}
                        <Table.Cell>Actualizar</Table.Cell>
                        <Table.Cell>Eliminar</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {APIData.map((data) => (
                        <Table.Row key={data._id}>
                            {tableColumns.map((column) => (
                                <Table.Cell key={column}>
                                    {Array.isArray(data[column]) ? data[column].join(', ') : data[column]}
                                </Table.Cell>
                            ))}
                            <Table.Cell>
                                <Link to={
                                    {
                                        pathname: '/update',
                                        state: { data: JSON.stringify(data) },
                                    }}
                                    onClick={() => localStorage.setItem('dataID', data._id)}>
                                    <Button className='edit-button'><svg className="edit-svgIcon" viewBox="0 0 512 512">
                                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                    </svg></Button>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Button className='danger' onClick={() => onDelete(data._id)}><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}