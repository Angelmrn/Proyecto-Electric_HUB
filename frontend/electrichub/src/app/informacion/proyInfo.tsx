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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./informacion.css";
import { Link } from "react-router-dom"
import ResponsiveAppBar from '../responsiveappbar';




const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/cont_binario.png';
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
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full md:mt-[-15vh]' style={{ boxSizing: 'border-box'}}>
        <div className={`flex flex-col justify-center gap-6 rounded-lg bg-customise 
              w-full md:px-10 md:mt-[-10vh] sm:mt-[10vh] sm:items-center sm:text-center md:items-start md:text-left`} style={{ width: '100vw', height: 'auto', boxSizing: 'border-box'}}>
            <ImagenProyecto />
            <MostrarInformacionProyecto />
        </div>
          <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise w-full md:px-10 ' style={{ width: '100vw', height: '100vh', 
              boxSizing: 'border-box' }}>
            <TablacomponentesElavoracionProyecto />
          </div>
        </div>


    </main>
  );
}



//----------------- IMAGEN-componentesINFO----------------

function ImagenProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 md:py-5 w-full' style={{  height: '250px', width: '300px', marginTop:'-13vh' }}>
      <label className='NombreProyecto'>Nombre del Proyecto</label>
      <img src={imagen2} alt="imagenComponente" />
    </div>
  );
}


//----------------- MOSTRAR InformacionComponente ----------------

function MostrarInformacionProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 w-full' style={{  height: 'auto', width: '300px' }}>
      <Card style={{ marginTop: '-60px', width: '150%', height: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Informacion del Proyecto
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }}>
            Informacion 
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

//----------------- TABLA - componentesElavoracionProyecto ----------------

function TablacomponentesElavoracionProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-10 w-full' style={{  height: 'auto', width: 'auto', marginTop:'-35vh' }}>

      <table className='TablaComponentesParecidos' style={{marginTop:'-10vh'}}>
      <caption style={{captionSide: 'top'}}>Componentes para elaborar el Proyecto</caption>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nombre 1</td>
          <td>Imagen 2</td>
        </tr>
        <tr>
          <td>Nombre 2</td>
          <td>Imagen 2</td>
        </tr>
        <tr>
          <td>Nombre 3</td>
          <td>Imagen 3</td>
        </tr>  
      </tbody>
      </table>
    </div>
  );
}



