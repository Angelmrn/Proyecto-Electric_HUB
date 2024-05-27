"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ResponsiveAppBar from '../responsiveappbar';

const Mainpage = () => {
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
              'Authorization': `Token ${localStorage.getItem('token')}`,
            },
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

  return (
    <main className="flex min-h-screen flex-col w-full">
      <div className="flex h-40 shrink-0 items-start rounded-lg md:h-80 w-full">
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handleLogout={handleLogout} />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-10 md:px-20">
        <div className="flex flex-col justify-center">
          <FormularioProy />
        </div>
        <div className="flex flex-col justify-center"></div>
      </div>
    </main>
  );
};

const FormularioProy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState('');
  const [proyNombre, setProyNombre] = useState('');
  const [fileimg1, setFileimg1] = useState('');
  const fileInputRef1 = useRef(null);
  const [newFileImg1, setNewFileImg1] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [componentesSeleccionados, setComponentesSeleccionados] = useState([]);

  const handleChangeNombre = (event) => {
    setProyNombre(event.target.value);
  };

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const selectedHandlerimg1 = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewFileImg1(file);
    setFileimg1(file ? URL.createObjectURL(file) : '');
  };

  const handleCheckboxChange = (event) => {
    const componenteId = parseInt(event.target.name, 10);
    if (event.target.checked) {
      setComponentesSeleccionados([...componentesSeleccionados, componenteId]);
    } else {
      setComponentesSeleccionados(componentesSeleccionados.filter((id) => id !== componenteId));
    }
  };

  useEffect(() => {
    console.log('Obteniendo información del proyecto:', id);
    const obtenerInformacionProyecto = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/infop/${id}/`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          const proyecto = data.proyecto;
          setProyNombre(proyecto.nombre);
          setDescripcion(proyecto.descripcion);
          setFileimg1(proyecto.imagen);
          const componentesSeleccionadosIds = proyecto.componentes.map((componente) => componente.id);
          setComponentesSeleccionados(componentesSeleccionadosIds);

          console.log('Nombre del proyecto:', proyecto.nombre);
          console.log('Descripción del proyecto:', proyecto.descripcion);
          console.log('Imagen del proyecto:', proyecto.imagen);
          console.log('Componentes seleccionados del proyecto:', componentesSeleccionadosIds);
          console.log('Componentes del proyecto:', proyecto.componentes);

        } else {
          console.error('Error al obtener información del proyecto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener información del proyecto:', error);
      }
    };

    obtenerInformacionProyecto();
  }, [id]);

  useEffect(() => {
    const obtenerComponentes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setComponentes(data.componentes || []);
          console.log('Componentes obtenidos del backend:', componentes);
        } else {
          console.error('Error al obtener los componentes:', response.statusText);
          setComponentes([]);
        }
      } catch (error) {
        console.error('Error al obtener los componentes:', error);
        setComponentes([]);
      }
    };

    obtenerComponentes();
  }, []);

  const handleActualizarProyecto = async () => {
    const formData = new FormData();
    formData.append('nombre', proyNombre);
    formData.append('descripcion', descripcion);
    if (newFileImg1 && newFileImg1 !== fileimg1) formData.append('fileimg1', newFileImg1);
    formData.append('componentesSeleccionados', JSON.stringify(componentesSeleccionados));
    const nombreEncoded = encodeURIComponent(proyNombre);

    console.log('Actualizando proyecto:', id);
    console.log('Nombre:', nombreEncoded);
    console.log('Descripción:', descripcion);
    console.log('Imagen 1:', fileimg1);
    console.log('Componentes seleccionados:', componentesSeleccionados);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alterproy/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Proyecto actualizado:', data);
        navigate('/myPosts');
      } else {
        console.error('Error al actualizar el proyecto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
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
        <div>
          <h1>Formulario Modificar Componente</h1>
        </div>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Nombre"
              id="outlined-size-normal"
              value={proyNombre}
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

          <button type="button" onClick={handleActualizarProyecto}>
            Actualizar Proyecto
          </button>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5vh',
        }}
      >
        <input ref={fileInputRef1} onChange={selectedHandlerimg1} className="form-control" type="file" />
        {!newFileImg1 && (
          <>
            <h1>Imagen del Proyecto:</h1>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${fileimg1}`} alt="imagenProyecto" style={{ width: '100px', height: '100px' }} />
          </>
        )}

      </Box>
      <Box sx={{ flex: 1 }}>
        <h2>Componentes:</h2>
        <table style={{ borderSpacing: '10px 0' }}>
          <thead>
            <tr>
              <th style={{ padding: '0 10px' }}>ID</th>
              <th style={{ padding: '0 10px' }}>Nombre</th>
              <th style={{ padding: '0 10px' }}>Tipo</th>
              <th style={{ padding: '0 10px' }}>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {componentes.map((componente) => (
              <tr key={componente.id}>
                <td style={{ padding: '0 10px' }}>{componente.id}</td>
                <td style={{ padding: '0 10px' }}>{componente.nombre}</td>
                <td style={{ padding: '0 10px' }}>{componente.tipo}</td>
                <td style={{ padding: '0 10px' }}>
                  <Checkbox
                    name={componente.id.toString()}
                    checked={componentesSeleccionados.includes(componente.id)}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Mainpage;
