"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import './mostrar.css'
import ResponsiveAppBar from '../responsiveappbar';



const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/Lupa.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];


export default function Mainpage(){
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('token')) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`, // O cualquier otro método para enviar el token al backend
            }
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setUsername(data.user.username);
            setFirstName(data.user.first_name);
          } else {
            setIsLoggedIn(false);
            setUsername('');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }else{
      setIsLoggedIn(false);
    }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    setUsername('');
    setFirstName('');
    navigate('/login');
  };

  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg  md:h-80 w-full">
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout}/>
      </div>
      <div className='flex flex-col  justify-center gap-6 rounded-lg bg-customise
            px-6 py-0 md:px-20 w-full'>
        <BuscarComp />
      <div className='flex flex-col md:flex-row justify-between items-center' style={{ height:'auto'}}>
        <CeckboxComponentes />
        <TablaComp />
      </div>
        <BotonesPrueba />
      </div>
    </main>
  );
}




//----------------INPUT - componentes----------------

function BuscarComp() {
  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:'26vh' }}>
      <TextField id="outlined-basic" label="Buscar componente por id o Nombre" variant="outlined" sx={{ width: '42%' }} />
      <button className='botonBUSCAR'>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}


//----------------TABLA - COMPONENTES----------------

function TablaComp() {  
  return (
    <table className='TablaMostrarComp' style={{marginLeft:'20vh'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ID 1</td>
          <td>Nombre 1</td>
          <td>Categoria 1</td>
        </tr>
        <tr>
          <td>ID 2</td>
          <td>Nombre 2</td>
          <td>Categoria 2</td>
        </tr>
        <tr>
          <td>ID 3</td>
          <td>Nombre 3</td>
          <td>Categoria 3</td>
        </tr>
        
      </tbody>
    </table>
  );
}

function CeckboxComponentes() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Categorias</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div  style={{margin: '10px 0',  width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente1" name="componente1" value="componente1" />
          <label htmlFor="componente1"> Componente 1</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente2" name="componente2" value="componente2" />
          <label htmlFor="componente2"> Componente 2</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente3" name="componente3" value="componente3" />
          <label htmlFor="componente3"> Componente 3</label>
        </div>
      </div>
    </div>
  );
}

//----------------BOTONES - PRUEBAS----------------

function BotonesPrueba() {
  return(
  <div>
  <Link to='/Compinfo'>
    <button>, Mostrar-InfoComponentes</button>
    </Link>
  </div>
  );
}
