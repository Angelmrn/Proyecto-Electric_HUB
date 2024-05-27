"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveAppBar from '../responsiveappbar';


const imagen2 = '/Lupa.png';

export default function Mainpage({}) {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latestProjects, setLatestProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (localStorage.getItem('token')) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`,
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
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchLatestProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lastproy` , {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setLatestProjects(data);
        }
      } catch (error) {
        console.error('Error fetching latest projects:', error);
      }
    };

    fetchProfile();
    fetchLatestProjects();
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
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout} />
      </div>
      <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-20 w-full'>
        <Selector />
        <Carrusel latestProjects={latestProjects} />
      </div>
    </main>
  );
}

function Selector() {
  const [Buscar, setBuscar] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setBuscar(event.target.value as string);
  };

  const handleSearch = () => {
    if (Buscar === 'componentes') {
      navigate('/mostrarComp');
    } else if (Buscar === 'proyectos') {
      navigate('/mostrarProy');
    }
  };
  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl sx={{ width: '40%' }}>
        <InputLabel id="demo-simple-select-label">Buscar</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Buscar}
          label="Buscar"
          onChange={handleChange}
        >
          <MenuItem value='componentes'>Componentes</MenuItem>
          <MenuItem value='proyectos'>Proyectos</MenuItem>
        </Select>
      </FormControl>
      <button className='botonBUSCAR' onClick={handleSearch}>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}


interface LatestProject {
  imagen: string | undefined;
  id: number;
  nombre: string;
}

function Carrusel({ latestProjects }: { latestProjects: LatestProject[] }) {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Limitar la cantidad de proyectos a mostrar a un máximo de 5
  const limitedProjects = latestProjects.slice(0, 5);

  const settings = {
    dots: true,
    infinite: latestProjects.length > 1, // Solo será infinito si hay más de un proyecto
    speed: 500,
    slidesToShow: Math.min(slidesToShow, limitedProjects.length), 
    slidesToScroll: 1
  };

  return (
    <div className='w-1/2 m-auto'>
      <div className='mt-10'>
        <h1 className='py-5'style={{alignContent: "center", justifyContent:"center"}}><strong>Ultimos Proyectos Agregados: </strong></h1>
        {latestProjects.length === 0 ? ( // Verifica si no hay proyectos
          <h1 className='rounded-t-xl flex justify-center items-center py-5'style={{alignContent: "center", justifyContent:"center"}}><strong>No hay proyectos disponibles.</strong></h1>
        ) : (
        <Slider {...settings}>
          {latestProjects.map((project, index) => (
            <div key={index} className='bg-customise h-[400px] text-black rounded-xl'>
              <div className='rounded-t-xl flex justify-center items-center'>
                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${project?.imagen}`} alt='' className='h-44 w-64' />
              </div>
              <div className='rounded-t-xl flex justify-center items-center py-3'>
                <h2 className='text-xl'>{project.nombre}</h2>
              </div>
              <div className='flex flex-col justify-center items-center gap-4 p-2 py-10'>
                <button className='BotonCARRUSEL' onClick={() => navigate(`/proyInfo/${project.id}/${project.nombre}`)}>Ver</button>
              </div>
            </div>
          ))}
        </Slider>
        )}
      </div>
    </div>
  );
}