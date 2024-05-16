"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full' style={{ marginTop: '-20vh', boxSizing: 'border-box' }}>
            <div className='flex flex-col sm:items-center sm:text-center md:items-start md:text-left justify-center gap-6 rounded-lg bg-customise 
                w-full md:px-10 order-last md:order-first' style={{ width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
              <ImagenComponentes />
              <TablaComponentesparecidos />
            </div>
            <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise w-full md:px-10  md:mt-10' style={{ width: '100vw', height: '50vh', 
                boxSizing: 'border-box'}}>
              <MostrarInformacionComponente />
            </div>
          </div>


    </main>
  );
}



//----------------- IMAGEN-componentesINFO----------------

function ImagenComponentes(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-10 w-full' style={{  height: '250px', width: '300px'}}>
      <label>Imagen del componente</label>
      <img src={imagen2} alt="imagenComponente" />
    </div>
  );
}


//----------------- TABLA - componentesparecidos ----------------

function TablaComponentesparecidos(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-10 w-full' style={{  height: '250px', width: '300px' }}>
      Componentes Parecidos
      <table className='TablaComponentesParecidos'>
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nombre 1</td>
        </tr>
        <tr>
          <td>Nombre 2</td>
        </tr>
        <tr>
          <td>Nombre 3</td>
        </tr>  
      </tbody>
      </table>
    </div>
  );

}

//----------------- MOSTRAR InformacionComponente ----------------


interface ComponenteInfo {
  nombre: string;
  descripcion: string;
  tipo: string;
  // Agrega otras propiedades si es necesario
}

function MostrarInformacionComponente(){

  const [componenteInfo, setComponenteInfo] = useState<ComponenteInfo | null>(null);
  const { id, tipo, nombre } = useParams<{ id: string, tipo: string, nombre: string }>();

  useEffect(() => {
    console.log('ID:', id);
    console.log('Tipo:', tipo);
    console.log('Nombre:', nombre);
    const obtenerInformacionComponente = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes/${id}/${tipo}/${nombre}`, {
          method: 'GET',
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Información del componente:', data);
          setComponenteInfo(data);
        } else {
          console.error('Error al obtener información del componente:', response.statusText);
        }

      } catch (error) {
        console.error('Error al obtener información del componente:', error);
      }
    };

    obtenerInformacionComponente();
  }, [id, tipo, nombre] );

  
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-20 md:px-10 w-full mt-0' style={{  height: 'auto', width: '1000px'}}>
      <Card>
        <CardContent>
          {componenteInfo ? (
            <>
              <Typography variant="h5" component="div">
                {componenteInfo.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {componenteInfo.descripcion}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Cargando información del componente...
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


