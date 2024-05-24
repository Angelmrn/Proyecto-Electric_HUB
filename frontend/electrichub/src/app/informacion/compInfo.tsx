"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./informacion.css";
import { Link } from "react-router-dom";
import ResponsiveAppBar from '../responsiveappbar';

const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/cont_binario.png';
const pages = ['Tools'];
const settings = ['Agregar Componente', 'Agregar Proyecto', 'Logout'];

export default function Mainpage() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [componenteInfo, setComponenteInfo] = useState<ComponenteInfo | null>(null);
  const { id, tipo, nombre } = useParams<{ id: string, tipo: string, nombre: string }>();
  const [componentesSimilares, setComponentesSimilares] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const fetchProfile = async () => {
        try {
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
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const obtenerInformacionComponente = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes/${id}/${tipo}/${nombre}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setComponenteInfo(data);
          
          const obtenerComponentesSimilares = async () => {
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes` , {
                method: 'GET',
              });

              if (response.ok) {
                const allComponents = await response.json();
                console.log(allComponents);
                // Combina todos los componentes en un solo array
                const combinedComponents = [].concat(
                  allComponents.accesorios,
                  allComponents.buzzers,
                  allComponents.electro_analogica,
                  allComponents.electro_digital,
                  allComponents.modulos,
                  allComponents.motores,
                  allComponents.opto_electronica,
                  allComponents.sensores,
                  allComponents.switches
                );
                const componentesSimilares = combinedComponents.filter((componente: any) => 
                  componente.tipo === tipo && componente.id !== id && componente.nombre !== nombre
                );
                setComponentesSimilares(componentesSimilares);
              } else {
                console.error('Error al obtener componentes similares:', response.statusText);
              }
            } catch (error) {
              console.error('Error al obtener componentes similares:', error);
            }
          };

          obtenerComponentesSimilares();
        } else {
          console.error('Error al obtener información del componente:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener información del componente:', error);
      }
    };

    obtenerInformacionComponente();
  }, [id, tipo, nombre]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setFirstName('');
    navigate('/login');
  };

  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg md:h-80 w-full">
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout} />
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full' style={{ marginTop: '-20vh', boxSizing: 'border-box' }}>
        <div className='flex flex-col sm:items-center sm:text-center md:items-start md:text-left justify-center gap-6 rounded-lg bg-customise w-full md:px-10 order-last md:order-first' style={{ width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
          <Typography variant="h4" component="div">
            {componenteInfo && <ImagenComponentes1 imagen1={componenteInfo.imagen1} />}
          </Typography>
          <div>
            <TablaComponentesparecidos componentesSimilares={componentesSimilares} />
          </div>
        </div>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise w-full md:px-10 md:mt-10' style={{ width: '100vw', height: '50vh', boxSizing: 'border-box', marginTop: '10rem'}}>
          <MostrarInformacionComponente componenteInfo={componenteInfo} />
        </div>
      </div>
    </main>
  );
}

//----------------- MOSTRAR InformacionComponente ----------------

interface ComponenteInfo {
  nombre: string;
  descripcion: string;
  tipo: string;
  imagen1: string;
  imagen2: string;
}

//----------------- IMAGEN-componentesINFO----------------

const ImagenComponentes1 = ({ imagen1 }: { imagen1: string }) => {
  const getImageUrl = (imagePath: string) => {
    // Remove leading slash from imagePath if it exists
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${normalizedPath}`;
  };

  return (
    <div className='Img1' style={{ height: '250px', width: '300px' }}>
      {imagen1 ? (
        <img src={getImageUrl(imagen1)} alt="imagenComponente" style={{  width:'250px' , height:'250px'}} />
      ) : (
        <p>No hay imagen disponible</p>
      )}
    </div>
  );
};

const ImagenComponentes2 = ({ imagen2 }: { imagen2: string }) => {
  const getImageUrl = (imagePath: string) => {
    // Remove leading slash from imagePath if it exists
    const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${normalizedPath}`;
  };

  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-20 md:px-10 w-full' style={{ height: '250px', width: '300px' }}>
      {imagen2 ? (
        <img src={getImageUrl(imagen2)} alt="imagenComponente" style={{  height:'200px', width:'200px',marginLeft:'30vh' }} />
      ) : (
        <p>No hay imagen disponible</p>
      )}
    </div>
  );
};

//----------------- TABLA - componentesparecidos ----------------

function TablaComponentesparecidos({ componentesSimilares }: { componentesSimilares: any[] }) {
  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-20 md:px-10 w-full' style={{ height: '250px', width: '300px' }}>
      Componentes Parecidos
      <table className='TablaComponentesParecidos'>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {componentesSimilares.length > 0 ? (
            componentesSimilares.map((componente) => (
              <tr key={componente.id}>
                <td><Link to={`/compInfo/${componente.id}/${componente.tipo}/${componente.nombre}`}>{componente.nombre}</Link></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={1}>No hay componentes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function MostrarInformacionComponente({ componenteInfo }: { componenteInfo: ComponenteInfo | null }) {
  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-20 md:px-10 w-full mt-0' style={{ height: 'auto', width: '1000px', marginRight:'20vh' }}>
      <Card>
        <CardContent>
          {componenteInfo ? (
            <>
              <Typography variant="h5" component="div">
                {componenteInfo.nombre}
              </Typography>
              <br></br>
              <Typography variant="body2" color="text.secondary">
              <pre style={{ whiteSpace: 'pre-wrap' }}> 
                {componenteInfo.descripcion}
              </pre>
              </Typography>
              <Typography>
                <ImagenComponentes2 imagen2={componenteInfo.imagen2} />
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
