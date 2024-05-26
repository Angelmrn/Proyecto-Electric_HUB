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
  const [componentInfo, setComponentInfo] = useState({
    id: '',
    tipo: '',
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
          <FormularioComp />
        </div>
        <div className='flex flex-col justify-center'>
        </div>
      </div>
      
    </main>
  );
}

const FormularioComp = () => {
  const navigate = useNavigate();
  const { id, tipo, nombre } = useParams();
  const [descripcion, setDescripcion] = useState('');
  const [compnombre, setCompnombre] = useState('');
  const [fileimg1, setFileimg1] = useState('');
  const [fileimg2, setFileimg2] = useState('');
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [newFileImg1, setNewFileImg1] = useState(null);
  const [newFileImg2, setNewFileImg2] = useState(null); 
    
      const handleChangeNombre = (event) => {
        setCompnombre(event.target.value);
      };
      
      const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
      };

      const selectedHandlerimg1 = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        setNewFileImg1(file);
        setFileimg1(file ? URL.createObjectURL(file) : '');
      };
      
      const selectedHandlerimg2 = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        setNewFileImg2(file);
        setFileimg2(file ? URL.createObjectURL(file) : '');

      };

  useEffect(() => {
    console.log('Obteniendo información del componente:', id, tipo, nombre);
    const obtenerInformacionComponente = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes/${id}/${tipo}/${nombre}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setCompnombre(data.nombre);
          setDescripcion(data.descripcion);
          setFileimg1(data.imagen1);
          setFileimg2(data.imagen2);

          console.log('Nombre del componente:', data.nombre);
          console.log('Descripción del componente:', data.descripcion);
          console.log('Tipo del componente:', data.tipo);
          console.log('Imagen 1 del componente:', data.imagen1);
          console.log('Imagen 2 del componente:', data.imagen2);
        } else {
          console.error('Error al obtener información del componente:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener información del componente:', error);
      }
    };

    obtenerInformacionComponente();
  }, [id]);

  const handleActualizarComponente = async () => {
    const formData = new FormData();
    formData.append('nombre', compnombre);
    formData.append('descripcion', descripcion);
    if (newFileImg1 && newFileImg1 !== fileimg1) formData.append('fileimg1', newFileImg1);
    if (newFileImg2 && newFileImg2 !== fileimg2) formData.append('fileimg2', newFileImg2);


    const nombreEncoded = encodeURIComponent(compnombre);

    console.log('Actualizando componente:', id);
    console.log('Tipo:', tipo);
    console.log('Nombre:', nombreEncoded);
    console.log('Descripción:', descripcion);
    console.log('Imagen 1:', newFileImg1);
    console.log('Imagen 2:', newFileImg2);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modificarcomp/${id}/${tipo}/${nombreEncoded}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Componente actualizado:', data);
        navigate('/myPosts');
      } else {
        console.error('Error al actualizar el componente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el componente:', error);
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
              value={compnombre}
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
            <TextField
              id="outlined-multiline-static"
              label="tipo"
              value={tipo}
            />
            </FormControl>
          </Box>
          <button type='button' onClick={handleActualizarComponente}>Actualizar Componente</button>
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
            <h1>Primera Imagen del Componente:</h1>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${fileimg1}`} alt="imagenComponente" style={{ width: '100px', height: '100px' }} />
          </>
        )}
        <input style={{ marginTop: '10vh' }} ref={fileInputRef2} onChange={selectedHandlerimg2} className="form-control" type="file" />
        {!newFileImg2 && (
          <>
            <h1>Segunda Imagen del Componente:</h1>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${fileimg2}`} alt="imagenComponente" style={{ width: '100px', height: '100px' }} />
          </>
        )}
      </Box>
    </Box>
  );

}
