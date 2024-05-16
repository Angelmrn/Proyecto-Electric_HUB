"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
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



const imagenInicio = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagenLupa = '/Lupa.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];


export default function Mainpage(){
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

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

  function handleImage1(value: SetStateAction<File | null>): void {
    throw new Error('Function not implemented.');
  }

  function handleImage2(value: SetStateAction<File | null>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg  md:h-80 w-full">
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout}/>
      </div>
      
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-10 md:px-20'>
        <div className='flex flex-col justify-center'>
          <FormularioComp handleImage1={handleImage1} handleImage2={handleImage2} />
        </div>
        <div className='flex flex-col justify-center'>
          <FileUploadComponent image1={image1} image2={image2} handleImage1={function (value: React.SetStateAction<File | null>): void {
            throw new Error('Function not implemented.');
          } } handleImage2={function (value: React.SetStateAction<File | null>): void {
            throw new Error('Function not implemented.');
          } } />
        </div>
      </div>
    </main>
  );
}


//----------------FORMULARIO----------------

const FormularioComp = ({ handleImage1, handleImage2 }: { handleImage1: Dispatch<SetStateAction<File | null>>, handleImage2: Dispatch<SetStateAction<File | null>> }) => {

  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

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

  const handleImageChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleImage1(file);
  };
  
  const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleImage2(file);
  };

  const navigate = useNavigate();

  const handleSubirComponente = async () => {
    try{

      if (!nombre || !descripcion || !tipo) {
        console.log('Faltan datos');
        return;
      }else{
        console.log('Datos:' + nombre + descripcion + tipo + 'Subiendo componente...');
      }

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('tipo', tipo);

      // Subir la primera imagen
      if (image1) {
        formData.append('imagen1', image1);
      }
  
      // Subir la segunda imagen
      if (image2) {
        formData.append('imagen2', image2);
      }

      console.log('Subiendo componente: ', formData.get('nombre'), formData.get('descripcion'), formData.get('tipo'), formData.get('imagen1'), formData.get('imagen2'));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {

      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      },

      body: formData

    });

    if (response.ok) {
      navigate('/mostrarComp');
    }else{
      console.log('Error al subir componente', response.statusText);
    }

    }catch (error) {
      console.error('Error subiendo componente:', error);
    }
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
          <button type='button' onClick={handleSubirComponente}>Subir Componente</button>
        </Box>
      );
}

//----------------SUBIR IMAGEN----------------

function FileUploadComponent({ image1, image2, handleImage1, handleImage2 }: { image1: File | null, image2: File | null, handleImage1: Dispatch<SetStateAction<File | null>>, handleImage2: Dispatch<SetStateAction<File | null>> }) {

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleImage1(file);
  };
  
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleImage2(file);
  };

  return (
    <div>
      <div>
        <input type="file" accept=".png" onChange={handleFileChange1} />
        {image1 && (
          <img src={URL.createObjectURL(image1)} alt="Selected" style={{ width: '80%', height: '80%' }} />
        )}
      </div>
      <div>
        <input type="file" accept=".png" onChange={handleFileChange2} />
        {image2 && (
          <img src={URL.createObjectURL(image2)} alt="Selected" style={{ width: '80%', height: '80%' }} />
        )}
      </div>
    </div>
  );
}

