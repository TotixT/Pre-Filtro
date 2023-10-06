import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../App.css"



export default function GetUsuario() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/usuario`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data)
            })
    }, [])

    const setData = (data) => {
        let { _id, nombre, correo_electronico, fecha_nacimiento, metas_salud, historial_medico, conexiones } = data;
        localStorage.setItem('ID', _id);
        localStorage.setItem('Nombre', nombre);
        localStorage.setItem('Correo Electronico', correo_electronico);
        localStorage.setItem('Fecha Nacimiento', fecha_nacimiento);
        localStorage.setItem('Metas de Salud', metas_salud);
        localStorage.setItem('Historial Medico', historial_medico);
        localStorage.setItem('Conexiones', conexiones);
    }

    const getData = () => {
        axios.get(`http://localhost:5001/API/usuario`)
            .then((response) => {
                console.log(response.data);
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const onDelete = (_id) => {
        axios.delete(`http://localhost:5001/API/del/usuario/${_id}`)
            .then(() => {
                getData()
            })
    }

    return (
        <div className="table-container">
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Correo</Table.HeaderCell>
                <Table.HeaderCell>Fecha Nacimiento</Table.HeaderCell>
                <Table.HeaderCell>Metas Salud</Table.HeaderCell>
                <Table.HeaderCell>Historial Medico</Table.HeaderCell>
                <Table.HeaderCell>Conexiones</Table.HeaderCell>
                <Table.HeaderCell>Actualizar</Table.HeaderCell>
                <Table.HeaderCell>Eliminar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {APIData.map((data) => (
                <Table.Row key={data._id} className="table-row">
                  <Table.Cell className="table-cell">{data.nombre}</Table.Cell>
                  <Table.Cell className="table-cell">{data.correo_electronico}</Table.Cell>
                  <Table.Cell className="table-cell">{data.fecha_nacimiento}</Table.Cell>
                  <Table.Cell className="table-cell">{data.metas_salud}</Table.Cell>
                  <Table.Cell className="table-cell">{data.historial_medico}</Table.Cell>
                  <Table.Cell className="table-cell">{data.conexiones}</Table.Cell>
                  <Table.Cell className="table-cell">
                    <Link to='/Update/UpdateUsuario' className="update-link">
                      <Button
                        className="action-button"
                        onClick={() => setData(data)}
                      >
                        Actualizar
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="table-cell">
                    <Button
                      className="action-button"
                      onClick={() => onDelete(data._id)}
                    >
                      Eliminar
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    
}