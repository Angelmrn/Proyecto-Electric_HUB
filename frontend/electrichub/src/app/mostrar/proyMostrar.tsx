"use client";

import React, { useState, useEffect, use } from 'react';
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
      <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise
            px-6 py-0 md:px-20 w-full md:mt-[0vh] sm:mt-[3vh] '>
              MOSTRAR PROYECTOS
        <BuscarComp />
        <div className='flex flex-row justify-between'>
          
          <TablaProy />
        </div>
      </div>
    </main>
  );
}



//----------------INPUT - componentes----------------

function BuscarComp() {
  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ml:13, marginTop:'-10vh' }}>
      <TextField id="outlined-basic" label="Buscar componente por id o Nombre" variant="outlined" sx={{ width: '36%' }} />
      <button className='botonBUSCAR'>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}


//----------------TABLA - COMPONENTES----------------

function TablaProy() {  

  const [proyectos, setproyectos] = useState<any[]>([]); 

  useEffect(() => {
    const ObtenerProyectos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mostrarproyectos`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setproyectos(data);
        } else {
          console.error('Error fetching proyectos');
        }
      } catch (error) {
        console.error('Error fetching proyectos:', error);
      }

    }

    ObtenerProyectos();
        
  }, []);



  return (
    <table className='TablaMostrarProy'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td><Link to={`/proyInfo/${proyecto.id}/${proyecto.nombre}`}>{proyecto.id}</Link></td>
              <td><Link to={`/proyInfo/${proyecto.id}/${proyecto.nombre}`}>{proyecto.nombre}</Link></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2}>No hay proyectos disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

