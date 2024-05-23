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
      
        <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise
              px-6 py-10 md:px-20 ' >
          <div className='flex flex-col justify-center'>
          <FormularioComp/> 
          </div>
          <div className='flex flex-col justify-center'>
           
          </div>
          
        </div>
      
    </main>
  );
}


//----------------FORMULARIO----------------

const FormularioComp= () => {

  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [img1, setFileimg1] = useState<File | string | null>(null);
  const [img2, setFileimg2] = useState<File | string | null>(null);
  const navigate = useNavigate(); 

  // Referencias para los campos de archivo
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTipo(event.target.value as string);
  };

  const handleChangeNombre = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNombre(event.target.value);
  };
  
  const handleChangeDescripcion = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescripcion(event.target.value);
  };
  
  const handleChangeTipo = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTipo(event.target.value);
  };

  const handleSubirComponente = async () => {
    try{

      if (!nombre || !descripcion || !tipo) {
        alert('Por favor llene todos los campos')
        if (!img1 && !img2){
          alert('Por favor seleccione una imagen')
          return;
        }
        return;
      }else{
        console.log('Datos:' + nombre + descripcion + tipo + 'Subiendo componente...');
      }
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('tipo', tipo);
      formData.append('imagen1', img1 as File);
      formData.append('imagen2', img2 as File);

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      }); 

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {

      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      },

      body: formData

    });

    if (response.ok) {
      console.log('Componente subido exitosamente');
      setNombre('');
      setDescripcion('');
      setTipo('');
      setFileimg1(null);
      setFileimg2(null);
      if (fileInputRef1.current) fileInputRef1.current.value = '';
      if (fileInputRef2.current) fileInputRef2.current.value = '';
      navigate('/mostrarComp');
    }else{
      console.log('Error al subir componente', response.statusText);
    }

    }catch (error) {
      console.error('Error subiendo componente:', error);
    }
  };

  //----------------IMAGENES----------------
  
  const selectedHandlerimg1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileimg1(event.target.files ? event.target.files[0] : 'No file selected');
  }

  
  const selectedHandlerimg2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileimg2(event.target.files ? event.target.files[0] : 'No file selected');
  }

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
        <div><h1> Formulario para agregar Componentes </h1></div>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField 
            label="Nombre"
            id="outlined-size-normal"
            value={nombre}
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
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChange}
              >
  
                <MenuItem value='Componente1'>Accesorio</MenuItem>
                <MenuItem value='Componente2'>Buzzer</MenuItem>
                <MenuItem value='Componente3'>Electronica Analogica</MenuItem>
                <MenuItem value='Componente4'>Electronica Digital</MenuItem>
                <MenuItem value='Componente5'>Modulo</MenuItem>
                <MenuItem value='Componente6'>Motor</MenuItem>
                <MenuItem value='Componente7'>Opto Electronica</MenuItem>
                <MenuItem value='Componente8'>Sensor</MenuItem>
                <MenuItem value='Componente9'>Switch</MenuItem>
  
              </Select>
            </FormControl>
          </Box>
          <button type='button' onClick={handleSubirComponente}>Subir Componente</button>
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
        

        <input style={{marginTop:'10vh'}} ref={fileInputRef2} onChange={selectedHandlerimg2} className="form-control" type="file" />
        
      </Box>
    </Box>
  );
}




