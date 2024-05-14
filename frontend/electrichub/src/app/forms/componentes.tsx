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
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');

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

  const handleSubirComponente = async () => {
    try{
      
      const componenteData = {
        nombre: nombre,
        descripcion: descripcion,
        tipo: tipo
      };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },

      body: JSON.stringify(componenteData)

    });

    if (response.ok) {
      console.log('Componente subido exitosamente');
    }else{
      console.log('Error al subir componente', response.statusText);
    }

    }catch (error) {
      console.error('Error subiendo componente:', error);
    }
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
            <button onClick={handleSubirComponente}>Subir Componente</button>
          </div>

          <div className='flex flex-col justify-center'>
            <FileUploadComponent />
          </div>
          
        </div>
      
    </main>
  );
}


//----------------FORMULARIO----------------

function FormularioComp ({}){

  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [tipo, setTipo] = React.useState('');

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

  
    return (
      
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
          </div>
        </Box>
      );
}

//----------------SUBIR IMAGEN----------------

function FileUploadComponent() {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  const handleFileUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage1(imageUrl);
    }
  };

  const handleFileUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage2(imageUrl);
    }
  };

  const handleRemoveImage1 = () => {
    setImage1(null);
  };

  const handleRemoveImage2 = () => {
    setImage2(null);
  };

  return (
    <div style={{ width: '250px', height: '250px' }}>
      <div style={{ margin: '10px', width: '400px', height: '250px' }}>
        <input type="file" accept=".png" onChange={handleFileUpload1} />
        {image1 && (
          <>
            <img src={image1} alt="Selected" style={{ width: '80%', height: '80%' }} />
            <button onClick={handleRemoveImage1}>Eliminar imagen</button>
           
          </>
        )}
      </div>
      <div style={{ margin: '10px', width: '400px', height: '250px' }}>
        <input type="file" accept=".png" onChange={handleFileUpload2} />
        {image2 && (
          <>
            <img src={image2} alt="Selected" style={{ width: '80%', height: '80%' }} />
            <button onClick={handleRemoveImage2}>Eliminar imagen</button>
            
          </>
        )}
      </div>
    </div>
  );
}




