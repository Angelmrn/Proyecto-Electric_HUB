"use client";
import React, { useState, useEffect, useRef  } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

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
import { Label } from '@mui/icons-material';
import ResponsiveAppBar from '../responsiveappbar';
import { useParams } from 'react-router-dom';


const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/Lupa.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];


export default function Mainpage(){
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [proyInfo, setProyInfo] = useState({
    id: '',
    nombre: '',
  });

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
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-10 md:px-20'>
        <div className='flex flex-col justify-center'>
          <FormularioProy />
        </div>
        <div className='flex flex-col justify-center'>
        </div>
      </div>
      
    </main>
  );
}

const FormularioProy= () => {
  const navigate = useNavigate();
  const { id, nombre } = useParams();
  const [descripcion, setDescripcion] = useState('');
  const [proyNombre, setProyNombre] = useState('');
  const [fileimg1, setFileimg1] = useState('');
  const fileInputRef1 = useRef(null);
  const [newFileImg1, setNewFileImg1] = useState(null);
    
      const handleChangeNombre = (event) => {
        setProyNombre(event.target.value);
      };
      
      const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
      };

      const selectedHandlerimg1 = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        setNewFileImg1(file);
        setFileimg1(file ? URL.createObjectURL(file) : '');
      };

  useEffect(() => {
    console.log('Obteniendo información del proyecto:', id);
    const obtenerInformacionProyecto = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/infop/${id}/`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          const proyecto = data.proyecto;
          setProyNombre(proyecto.nombre);
          setDescripcion(proyecto.descripcion);
          setFileimg1(proyecto.imagen);

          console.log('Nombre del proyecto:', proyecto.nombre);
          console.log('Descripción del proyecto:', proyecto.descripcion);
          console.log('Imagen del proyecto:', proyecto.imagen);
        } else {
          console.error('Error al obtener información del proyecto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener información del proyecto:', error);
      }
    };

    obtenerInformacionProyecto();
  }, [id]);

  const handleActualizarProyecto = async () => {
    const formData = new FormData();
    formData.append('nombre', proyNombre);
    formData.append('descripcion', descripcion);
    if (newFileImg1 && newFileImg1 !== fileimg1) formData.append('fileimg1', newFileImg1);

    const nombreEncoded = encodeURIComponent(proyNombre);

    console.log('Actualizando proyecto:', id);
    console.log('Nombre:', nombreEncoded);
    console.log('Descripción:', descripcion);
    console.log('Imagen 1:', fileimg1);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alterproy/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Proyecto actualizado:', data);
        navigate('/myPosts');
      } else {
        console.error('Error al actualizar el proyecto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <div><h1>Formulario Modificar Componente</h1></div>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Nombre"
              id="outlined-size-normal"
              value={proyNombre}
              onChange={handleChangeNombre}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Descripcion"
              multiline
              value={descripcion}
              rows={4}
              onChange={handleChangeDescripcion}
            />
          </Box>
    
          <button type='button' onClick={handleActualizarProyecto}>Actualizar Proyecto</button>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5vh'
      }}
      >
        <input ref={fileInputRef1} onChange={selectedHandlerimg1} className="form-control" type="file" />
        {!newFileImg1 && (
          <>
            <h1>Imagen del Proyecto:</h1>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${fileimg1}`} alt="imagenProyecto" style={{ width: '100px', height: '100px' }} />
          </>
        )}

      </Box>
    </Box>
  );

}
