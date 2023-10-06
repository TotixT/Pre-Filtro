import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Select } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export default function Post() {
    const [collectionName, setCollectionName] = useState('usuario');
    const [formData, setFormData] = useState({
        nombre: '',
        correo_electronico: '',
        fecha_nacimiento: '',
        metas_salud: [], 
        historial_medico: '',
        conexiones: [], 
    });

    const [selectedMetasSalud, setSelectedMetasSalud] = useState([]);
    const [selectedHistorialMedico, setSelectedHistorialMedico] = useState('');
    const [selectedConexiones, setSelectedConexiones] = useState([]);
    const [metasSaludOptions, setMetasSaludOptions] = useState([]);
    const [historialMedicoOptions, sethistorialMedicoOptions] = useState([]);
    const [conexionesOptions, setConexionesOptions] = useState([]);
    
    const [selectedUsuarioId, setSelectedUsuarioId] = useState('');
    const [selectedProfesionalId, setSelectedProfesionalId] = useState('');
    const [usuarioIdOptions, setUsuarioIdOptions] = useState([]);
    const [profesionalIdOptions, setProfesionalIdOptions] = useState([]);

    const [selectedRecetas, setSelectedRecetas] = useState([]);
    const [recetasPlanesComidaOptions, setRecetasPlanesComidaOptions] = useState([]);

    let history = useHistory();

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

    const handleCollectionChange = (newCollection) => {
        setCollectionName(newCollection);
        const initialFormData = {
            usuario: {
                nombre: '',
                correo_electronico: '',
                fecha_nacimiento: '',
                metas_salud: [],
                historial_medico: '',
                conexiones: []
            },
            calendario_citas: {
                usuario_id: '',
                profesional_id: '',
                fecha_cita: '',
                tipo_cita: ''
            },
            info_profesionales: {
                nombre: '',
                especialidad: '',
                direccion_clinica: '',
                telefono: ''
            },
            diario_alimentacion: {
                usuario_id: '',
                alimentos_consumidos: [],
                fecha: '',
                recetas_consumidas: []
            },
            recetas_planes_comida: {
                nombre: '',
                ingredientes: [],
                instrucciones: ''
            }
        }[newCollection];

        setFormData(initialFormData);
        setSelectedMetasSalud([]);
        setSelectedHistorialMedico('');
        setSelectedConexiones([]);
        setSelectedUsuarioId('');
        setSelectedProfesionalId('');
        setSelectedRecetas([]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMetasSaludSelectChange = (event, data) => {
        setSelectedMetasSalud(data.value);
    }

    const handleHistorialMedicoSelectChange = (event, data) => {
        setSelectedHistorialMedico(data.value);
    }

    const handleConexionesSelectChange = (event, data) => {
        setSelectedConexiones(data.value);
    }

    const handleUsuarioIdSelectChange = (event, data) => {
        setSelectedUsuarioId(data.value);
    }

    const handleProfesionalIdSelectChange = (event, data) => {
        setSelectedProfesionalId(data.value);
    }

    const handleRecetasSelectChange = (event, data) => {
        setSelectedRecetas(data.value);
        console.log(data.value);
    }

    const postData = () => {

        let updatedFormData = {
            ...formData
        }

        if(collectionName === 'usuario'){
            updatedFormData = {
                ...updatedFormData,
                    metas_salud: selectedMetasSalud,
                    historial_medico: selectedHistorialMedico,
                    conexiones: selectedConexiones
            }
        } else if(collectionName === 'calendario_citas'){
            updatedFormData = {
                ...updatedFormData,
                    usuario_id: selectedUsuarioId,
                    profesional_id: selectedProfesionalId,
            }
        } else if(collectionName === 'info_profesionales'){
            updatedFormData = {
                ...updatedFormData
            }
        } else if(collectionName === 'diario_alimentacion'){
            updatedFormData = {
                ...updatedFormData,
                    usuario_id: selectedUsuarioId,
                    recetas_consumidas: selectedRecetas

            }
        } else if(collectionName === 'recetas_planes_comida'){
            updatedFormData = {
                ...updatedFormData
            }
        } 

        axios.post(`http://localhost:5001/api/add/${collectionName}`, updatedFormData)
            .then(() => {
                history.push("/");
            })

            console.log(updatedFormData);
    }

    

    return (
        <div>
            <div>
                <Button onClick={() => history.goBack()} >Volver</Button>
            </div>
            <div>
                <p>Seleccionar la Coleccion:</p>
                <Button onClick={() => handleCollectionChange('usuario')}>Usuario</Button>
                <Button onClick={() => handleCollectionChange('calendario_citas')}>Citas</Button>
                <Button onClick={() => handleCollectionChange('info_profesionales')}>Profesionales</Button>
                <Button onClick={() => handleCollectionChange('diario_alimentacion')}>Diario Alimentacion</Button>
                <Button onClick={() => handleCollectionChange('recetas_planes_comida')}>Recetas</Button>
            </div>
            <div>
                <div>
                    <Form>
                        {Object.keys(formData).map((fieldName) => (
                            <Form.Field key={fieldName}>
                                <label style={{ color: "white" }}>{fieldName}</label>
                                {fieldName === 'historial_medico' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedHistorialMedico}
                                        options={historialMedicoOptions}
                                        onChange={handleHistorialMedicoSelectChange}
                                    />
                                ) : fieldName === 'metas_salud' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedMetasSalud}
                                        options={metasSaludOptions}
                                        onChange={handleMetasSaludSelectChange}multiple
                                    />
                                ) : fieldName === 'conexiones' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedConexiones}
                                        options={conexionesOptions}
                                        onChange={handleConexionesSelectChange}multiple
                                    />
                                ) : fieldName === 'usuario_id' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedUsuarioId}
                                        options={usuarioIdOptions}
                                        onChange={handleUsuarioIdSelectChange}
                                    />
                                ) : fieldName === 'profesional_id' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedProfesionalId}
                                        options={profesionalIdOptions}
                                        onChange={handleProfesionalIdSelectChange}
                                    />
                                ) : fieldName === 'recetas_consumidas' ? (
                                    <Select
                                        placeholder={`Seleccionar ${fieldName}`}
                                        name={fieldName}
                                        value={selectedRecetas}
                                        options={recetasPlanesComidaOptions}
                                        onChange={handleRecetasSelectChange}multiple
                                    />
                                ) : (
                                    <input
                                        placeholder={fieldName}
                                        name={fieldName}
                                        value={formData[fieldName]}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </Form.Field>
                        ))}
                        <center>
                            <Button type="submit" onClick={postData}>Crear</Button>
                        </center>
                    </Form>
                </div>
            </div>
        </div>
    )
}