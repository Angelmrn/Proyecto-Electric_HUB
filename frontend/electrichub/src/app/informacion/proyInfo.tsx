"use strict";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./informacion.css";
import ResponsiveAppBar from '../responsiveappbar';

const Mainpage = () => {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [project, setProject] = useState(null);
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();  // Assuming you are passing the project id in the URL

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
    const fetchProject = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/infop/${id}/`, {
          method: 'GET',
        });
        
          if (response.ok) {

            const data = await response.json();
            setProject(data.proyecto);
            setComponents(data.componentes);
          }
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
    fetchProject();
  }, [id]);

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
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full md:mt-[-15vh]' style={{ boxSizing: 'border-box' }}>
        <div className={`flex flex-col justify-center gap-6 rounded-lg bg-customise 
              w-full md:px-10 md:mt-[-10vh] sm:mt-[10vh] sm:items-center sm:text-center md:items-start md:text-left`} style={{ width: '100vw', height: 'auto', boxSizing: 'border-box' }}>
          <ImagenProyecto project={project} />
          <MostrarInformacionProyecto project={project} />
        </div>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise w-full md:px-10 ' style={{ width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
          <TablacomponentesElaboracionProyecto components={components} />
        </div>
      </div>
    </main>
  );
};

function ImagenProyecto({ project }: { project: any }) {
  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 md:py-5 w-full' style={{ height: '250px', width: '300px', marginTop: '-13vh' }}>
      <label className='NombreProyecto'>{project?.nombre}</label>
      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${project?.imagen}`} alt="imagenProyecto" />
    </div>
  );
}


function MostrarInformacionProyecto({ project }: { project: any }) {
  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 w-full' style={{ height: 'auto', width: '300px' }}>
      <Card style={{ marginTop: '-60px', width: '150%', height: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {project?.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }}>
            {project?.descripcion}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

function TablacomponentesElaboracionProyecto({ components }: { components: any[] }) {
  return (
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-10 w-full' style={{ height: 'auto', width: 'auto', marginTop: 'auto' }}>
      <table className='TablaComponentesParecidos' style={{ marginTop: '-10vh' }}>
        <caption style={{ captionSide: 'top' }}>Componentes para elaborar el Proyecto</caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => (
            <tr key={index}>
              <td>{component.nombre}</td>
              <td><img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${component.imagen1}`} alt="imagenComponente" style={{ width: '100px', height: '100px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mainpage;
