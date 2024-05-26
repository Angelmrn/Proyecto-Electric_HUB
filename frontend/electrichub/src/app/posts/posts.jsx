"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import ResponsiveAppBar from '../responsiveappbar';


export default function Mainpage() {
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userComponents, setUserComponents] = useState([]); 
    const [userProjects, setUserProjects] = useState([]);
  
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
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUsername('');
      setFirstName('');
      navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/myposts`, {
              method: 'GET',
              headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
              }
            });
    
            if (response.ok) {
              const data = await response.json();
              setUserComponents(data.user_components);
              setUserProjects(data.user_projects);
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
              setUserComponents([]);
              setUserProjects([]);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (localStorage.getItem('token')) {
          fetchUserData();
        } else {
          setIsLoggedIn(false);
          setUserComponents([]);
          setUserProjects([]);
        }
      }, []);


    const handleModifyComponent = (id, tipo, nomnbre) => {
        // Redireccionar a la página de modificación del componente con el ID proporcionado
        navigate(`/modifyComp/${id}/${tipo}/${nomnbre}`);
    };

    const handleDeleteComponent = async (id, tipo) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deletecomponent/${id}/${tipo}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setUserComponents(userComponents => userComponents.filter(component => component.id !== id));
            } else {
                console.error('Error deleting component:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting component:', error);
        }
    };

    const handleModifyProyect = (id) => {
        // Redireccionar a la página de modificación del componente con el ID proporcionado
        navigate(`/modifyProy/${id}/`);
    };

    const handleDeleteProyect = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delproy/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setUserProjects( userProjects=> userProjects.filter(projects => projects.id !== id));
            } else {
                console.error('Error deleting component:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting component:', error);
        }
    };
  
      return (
        <main className='flex min-h-screen flex-col w-full'>
            <div className="flex h-40 shrink-0 items-start rounded-lg md:h-80 w-full">
                <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout} />
            </div>

            <div className='container'>
                <h1 className='py-2'style={{ marginLeft: '40vh' }}><strong>Mis componentes:</strong></h1>
                <table className='TablaMostrarComp' style={{ marginLeft: '85vh' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de Componente</th>
                            <th>Imagen</th>
                            <th colSpan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userComponents.length === 0 ? (
                            <tr>
                                <td colSpan="4">No hay componentes disponibles.</td>
                            </tr>
                        ) : (
                            userComponents.map(component => (
                                <tr key={component.id}>
                                    <td>
                                        <Link to={`/compInfo/${component.id}/${component.tipo}/${component.nombre}`}>{component.nombre}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/compInfo/${component.id}/${component.tipo}/${component.nombre}`}>{component.tipo}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/compInfo/${component.id}/${component.tipo}/${component.nombre}`}>
                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${component.imagen1}`} alt="imagenComponente" style={{ width: '100px', height: '100px' }}></img>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleModifyComponent(component.id, component.tipo, component.nombre)}>Modificar</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteComponent(component.id, component.tipo)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className='container' style={{ marginTop: '5vh' }}>
                <h1 style={{ marginLeft: '40vh' }}><strong>Mis Proyectos: </strong></h1>
                <table className='TablaMostrarProy' style={{ marginLeft: '2vh' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th colSpan={"2"}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProjects.length === 0 ? (
                            <tr>
                                <td colSpan="3">No hay proyectos disponibles.</td>
                            </tr>
                        ) : (
                            userProjects.map(proyect => (
                                <tr key={proyect.id}>
                                    <td>
                                        <Link to={`/proyInfo/${proyect.id}/${proyect.nombre}`}>{proyect.nombre}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/proyInfo/${proyect.id}/${proyect.nombre}`}>
                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${proyect?.imagen}`} alt="imagenProyecto" style={{ width: '100px', height: '100px' }} ></img>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="submit" variant="contained" style={{margin:'2vh'}} onClick={() => handleModifyProyect(proyect.id)} >Modificar</button>
                                    </td>
                                    <td>
                                        <button type="submit" variant="contained" style={{margin:'2vh'}} onClick={() => handleDeleteProyect(proyect.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
  }

