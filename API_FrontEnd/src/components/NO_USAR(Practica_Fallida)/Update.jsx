import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Button, Form, Select } from 'semantic-ui-react';
import { useLocation, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

export default function Update() {
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const [formInitialized, setFormInitialized] = useState(false);
    const id = localStorage.getItem('dataID');
    const location = useLocation();
    const { data, collectionName } = location.state || {};
    const dataFromGet = location.state.data ? JSON.parse(location.state.data) : {};
    const [metasSaludOptions, setMetasSaludOptions] = useState([]);
    const [historialMedicoOptions, sethistorialMedicoOptions] = useState([]);
    const [conexionesOptions, setConexionesOptions] = useState([]);
    const [usuarioIdOptions, setUsuarioIdOptions] = useState([]);
    const [profesionalIdOptions, setProfesionalIdOptions] = useState([]);
    const [recetasPlanesComidaOptions, setRecetasPlanesComidaOptions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/API/metas_salud`)
            .then((response) => {
                const options = response.data.map((metas) => ({
                    key: metas._id,
                    value: metas._id,
                    text: `${metas.descripcion}`,
                }));
                setMetasSaludOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5001/API/historial_medico`)
            .then((response) => {
                const options = response.data.map((historial) => ({
                    key: historial._id,
                    value: historial._id,
                    text: `${historial.alergias} ${historial.enfermedades_cronicas} ${historial.cirugias_previas}`,
                }));
                sethistorialMedicoOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5001/API/conexiones_comunicaciones`)
            .then((response) => {
                const options = response.data.map((conexiones) => ({
                    key: conexiones._id,
                    value: conexiones._id,
                    text: `${conexiones.correo_contacto}`,
                }));
                setConexionesOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5001/API/usuario`)
            .then((response) => {
                const options = response.data.map((usuario) => ({
                    key: usuario._id,
                    value: usuario._id,
                    text: `${usuario.nombre} ${usuario.correo_electronico}`,
                }));
                setUsuarioIdOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5001/API/info_profesionales`)
            .then((response) => {
                const options = response.data.map((profesionales) => ({
                    key: profesionales._id,
                    value: profesionales._id,
                    text: `${profesionales.nombre} ${profesionales.especialidad}`,
                }));
                setProfesionalIdOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5001/API/recetas_planes_comida`)
            .then((response) => {
                const options = response.data.map((recetas) => ({
                    key: recetas._id,
                    value: recetas._id,
                    text: `${recetas.nombre} ${recetas.instrucciones}`,
                }));
                setRecetasPlanesComidaOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {

        if (!formInitialized) {
            setFormData(dataFromGet);
            setFormInitialized(true);
        }
    }, [formInitialized, dataFromGet]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (formData[name] !== value) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSelectChange = (name, value) => {
        if (formData[name] !== value) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const updateData = () => {
        console.log('collectionName:', collectionName);
        console.log('id:', id);

        const { _id, ...updatedData } = formData;


        if (!id) {
            console.error('El valor de "id" no es válido.');
            return;
        }

        axios
            .put(`http://localhost:5001/API/upd/${collectionName}/${id}`, updatedData)
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
          <div className="button-container">
            <Button onClick={() => history.goBack()} className='shadow2__btn'>Volver</Button>
          </div>
          <div className="button-container vertical-buttons">
            {Array.isArray(dataFromGet) ? (
              dataFromGet.map((data) => (
                <div key={data._id}>
                  <Link
  to={{
    pathname: '/update',
    state: { data: JSON.stringify(data), collectionName: 'info_profesionales' },
  }}
  onClick={() => localStorage.setItem('dataID', data._id)}
>
  <Button className='edit-button'>Editar</Button>
</Link>
                </div>
              ))
            ) : (
              // Manejar el caso en que dataFromGet no es una matriz
              <p>Los datos no son válidos.</p>
            )}
          </div>
          <div className="center-content">
            <div className="login-box">
              <Form className='create-form'>
                {Object.keys(formData).map((fieldName) => (
                  <Form.Field key={fieldName}>
                    <label>{fieldName}</label>
                    {fieldName === 'historial_medico' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={historialMedicoOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                      />
                    ) : fieldName === 'metas_salud' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={metasSaludOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                        multiple
                      />
                    ) : fieldName === 'conexiones' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={conexionesOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                        multiple
                      />
                    ) : fieldName === 'usuario_id' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={usuarioIdOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                      />
                    ) : fieldName === 'profesional_id' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={profesionalIdOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                      />
                    ) : fieldName === 'recetas_consumidas' ? (
                      <Select
                        placeholder={`Seleccionar ${fieldName}`}
                        name={fieldName}
                        value={formData[fieldName]}
                        options={recetasPlanesComidaOptions}
                        onChange={(_, data) => handleSelectChange(fieldName, data.value)}
                        multiple
                      />
                    ) : (
                      <input
                        className="input-field"
                        placeholder={fieldName}
                        name={fieldName}
                        value={formData[fieldName] || ''}
                        onChange={handleInputChange}
                      />
                    )}
                  </Form.Field>
                ))}
                <center>
                  <Button className='uwu' type='submit' onClick={updateData}>
                    Actualizar
                  </Button>
                </center>
              </Form>
            </div>
          </div>
        </div>
      );
      

}