import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './App.css';
import CreateUsuario from './components/Create/CreateUsuario';
import GetUsuario from './components/Get/GetUsuario';
import UpdateUsuario from './components/Update/UpdateUsuario';
import GetCitas from './components/Get/GetCita';
import CreateCita from './components/Create/CreateCita';
import UpdateCita from './components/Update/UpdateCitas';
import GetProfesionales from './components/Get/GetProfesionales';
import CreateProfesionales from './components/Create/CreateProfesionales';
import UpdateProfesionales from './components/Update/UpdateProfesionales';
import GetDiarioAlimentacion from './components/Get/GetDiarioAlimentacion';
import CreateDiarioAlimentacion from './components/Create/CreateDiarioAlimentacion';
import UpdateDiarioAlimentacion from './components/Update/UpdateDiarioAlimentacion';
import GetRecetasComida from './components/Get/GetRecetasComida';
import CreateRecetasComida from './components/Create/CreateRecetasComida';
import UpdateRecetasComida from './components/Update/UpdateRecetasComida';

function App() {
  return (
    <Router>
      <div className='main'>
        {/* ------------------------ Rutas ---------------------- */}

        {/* Usuario */}
        <Route exact path="/">
          <Link to="/">
            <Button className='' >Usuario</Button>
          </Link>
        </Route>
        <Route exact path="/">
          <Link to="/Get/GetCitas">
            <Button className='' >Citas</Button>
          </Link>
        </Route>
        <Route exact path="/">
          <Link to="/Get/GetProfesionales">
            <Button className='' >Profesionales</Button>
          </Link>
        </Route>
        <Route exact path="/">
          <Link to="/Get/GetDiarioAlimentacion">
            <Button className='' >Diario Alimentacion</Button>
          </Link>
        </Route>
        <Route exact path="/">
          <Link to="/Get/GetRecetasComida">
            <Button className='' >Recetas Comida</Button>
          </Link>
        </Route>

        {/* Citas */}
        <Route exact path="/Get/GetCitas">
          <Link to="/">
            <Button>Usuario</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetCitas">
          <Link to="/Get/GetCitas">
            <Button>Citas</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetCitas">
          <Link to="/Get/GetProfesionales">
            <Button>Profesionales</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetCitas">
          <Link to="/Get/GetDiarioAlimentacion">
            <Button>Diario Alimentacion</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetCitas">
          <Link to="/Get/GetRecetasComida">
            <Button>Recetas Comida</Button>
          </Link>
        </Route>

        {/* Profesionales */}
        <Route exact path="/Get/GetProfesionales">
          <Link to="/">
            <Button>Usuario</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetProfesionales">
          <Link to="/Get/GetCitas">
            <Button>Citas</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetProfesionales">
          <Link to="/Get/GetProfesionales">
            <Button>Profesionales</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetProfesionales">
          <Link to="/Get/GetDiarioAlimentacion">
            <Button>Diario Alimentacion</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetProfesionales">
          <Link to="/Get/GetRecetasComida">
            <Button>Recetas Comida</Button>
          </Link>
        </Route>
        
        {/* Diario Alimentacion */}
        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/">
            <Button>Usuario</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/Get/GetCitas">
            <Button>Citas</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/Get/GetProfesionales">
            <Button>Profesionales</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/Get/GetDiarioAlimentacion">
            <Button>Diario Alimentacion</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/Get/GetRecetasComida">
            <Button>Recetas Comida</Button>
          </Link>
        </Route>
        
        {/* Recetas Comida */}
        <Route exact path="/Get/GetRecetasComida">
          <Link to="/">
            <Button>Usuario</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetRecetasComida">
          <Link to="/Get/GetCitas">
            <Button>Citas</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetRecetasComida">
          <Link to="/Get/GetProfesionales">
            <Button>Profesionales</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetRecetasComida">
          <Link to="/Get/GetDiarioAlimentacion">
            <Button>Diario Alimentacion</Button>
          </Link>
        </Route>
        <Route exact path="/Get/GetRecetasComida">
          <Link to="/Get/GetRecetasComida">
            <Button>Recetas Comida</Button>
          </Link>
        </Route>

        {/* ---------------------------- CRUD's ------------------------------------ */}
        <h2 className='main-header'>Salud & Bienestar</h2>
        <Route exact path="/">
          <Link to="/Create/CreateUsuario">
            <Button className='nav-button'>Crear Usuario</Button>
          </Link>
        </Route>
        <div className='route-container'>
          <Route exact path="/Create/CreateUsuario" component={CreateUsuario}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/" component={GetUsuario}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Update/UpdateUsuario" component={UpdateUsuario}></Route>
        </div>
{/*-------------------------------------------------------------------------------------------------*/}
        
        <Route exact path="/Get/GetCitas">
          <Link to="/Create/CreateCita">
            <Button>Crear Cita</Button>
          </Link>
        </Route>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Create/CreateCita" component={CreateCita}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Get/GetCitas" component={GetCitas}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Update/UpdateCitas" component={UpdateCita}></Route>
        </div>
      

{/*--------------------------------------------------------------------------------------------------*/}

        <Route exact path="/Get/GetProfesionales">
          <Link to="/Create/CreateProfesionales">
            <Button>Crear Profesional</Button>
          </Link>
        </Route>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Create/CreateProfesionales" component={CreateProfesionales}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Get/GetProfesionales" component={GetProfesionales}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Update/UpdateProfesionales" component={UpdateProfesionales}></Route>
        </div>

{/*--------------------------------------------------------------------------------------------------*/}

        <Route exact path="/Get/GetDiarioAlimentacion">
          <Link to="/Create/CreateDiarioAlimentacion">
            <Button>Crear Diario Alimentacion</Button>
          </Link>
        </Route>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Create/CreateDiarioAlimentacion" component={CreateDiarioAlimentacion}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Get/GetDiarioAlimentacion" component={GetDiarioAlimentacion}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Update/UpdateDiarioAlimentacion" component={UpdateDiarioAlimentacion}></Route>
        </div>

{/*---------------------------------------------------------------------------------------------------*/}

        <Route exact path="/Get/GetRecetasComida">
          <Link to="/Create/CreateRecetasComida">
            <Button>Crear Receta</Button>
          </Link>
        </Route>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Create/CreateRecetasComida" component={CreateRecetasComida}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Get/GetRecetasComida" component={GetRecetasComida}></Route>
        </div>
        <div className={{ marginTop: 20 }}>
          <Route exact path="/Update/UpdateRecetasComida" component={UpdateRecetasComida}></Route>
        </div>

      </div>
    </Router>
  );
}

export default App;














































































// import Get from './components/Get.jsx';
// import Post from './components/Post.jsx';
// import UpdateUsuario from './components/Update/UpdateUsuario';
// import Update from './components/Update.jsx';

{/* <div style={{ marginTop: 20, marginBottom: 20 }} >
  <Route exact path="/post" component={Post}></Route> 
</div> */}
{/* <div style={{ marginTop: 20, marginBottom: 20 }} >
  <Route exact path = "/update" component={Update}></Route>
</div> */}
{/* <div style={{ marginTop: 20, marginBottom: 20 }} >
  <Route exact path = "/update" component={UpdateUsuario}></Route>
</div>
<div style={{ marginTop: 20, marginBottom: 20 }} >
  <Route exact path = "/" component={Get}></Route>
</div> */}