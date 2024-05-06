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
import "./forms.css";
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
            px-6 py-10 md:px-20 w-full'>
        <div className='flex flex-col justify-center' style={{ height:'29vh'}}>
          <FormularioProy />
        </div>
        <div className='flex flex-col justify-center' >
          <TablaCompN />
          <FileUploadComponent />
        </div>
      </div>
    </main>
  );
}


//----------------FORMULARIO----------------

function FormularioProy (){
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
           <div><h1> Formulario para agregar Proyectos </h1></div>
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField label="Nombre" id="outlined-size-normal"/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
              />
            </Box>
          </div>
        </Box>
      );
}

//----------------TABLA-ComponentesNecesarios----------------
function TablaCompN (){
  return (
    <div style={{ margin: '10px', width: '400px', height: '250px', marginRight:'100px', marginLeft:'5vw' }}>
      <table className='TablaMostrarComp' style={{ width: 'auto', height: 'auto', marginTop:'0', marginLeft:'5vh' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" defaultValue="ID 1" /></td>
            <td><input type="text" defaultValue="Nombre 1" /></td>
            <td><input type="text" defaultValue="Categoria 1" /></td>
          </tr>
          <tr>
            <td><input type="text" defaultValue="ID 2" /></td>
            <td><input type="text" defaultValue="Nombre 2" /></td>
            <td><input type="text" defaultValue="Categoria 2" /></td>
          </tr>
          <tr>
            <td><input type="text" defaultValue="ID 3" /></td>
            <td><input type="text" defaultValue="Nombre 3" /></td>
            <td><input type="text" defaultValue="Categoria 3" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


//----------------SUBIR IMAGEN ----------------

function FileUploadComponent() {
  const [image1, setImage1] = useState<string | null>(null);

  const handleFileUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage1(imageUrl);
    }
  };

  const handleRemoveImage1 = () => {
    if (image1) {
      URL.revokeObjectURL(image1);
    }
    setImage1(null);
  };

  return (

      <div style={{ margin: '10px', width: '400px', height: '250px', marginTop:'5vh'}}>
        <input type="file" accept=".png" onChange={handleFileUpload1} />
        {image1 && (
          <>
            <img src={image1} alt="Selected" style={{ width: '80%', height: '80%' }} />
            <button onClick={handleRemoveImage1}>Eliminar imagen</button>
            <button style={{marginLeft:'2vh'}}>Subir imagen</button>
          </>
        )}
      
    </div>
  );
}








