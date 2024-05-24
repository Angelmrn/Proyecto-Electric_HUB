"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../responsiveappbar';
import { SelectChangeEvent } from '@mui/material/Select';

export default function Mainpage() {
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

  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg md:h-80 w-full">
        <ResponsiveAppBar isLoggedIn={isLoggedIn} username={username} first_name={first_name} handl={handleLogout} />
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-10 md:px-20 w-full'>
        <div className='flex flex-col top-5' style={{ height: '29vh' }}>
          <FormularioProy />
        </div>
      </div>
    </main>
  );
}

function FormularioProy() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [componentes, setComponentes] = useState<{ id: number, nombre: string, tipo: string }[]>([]);
  const [selectedComponentes, setSelectedComponentes] = useState<{ id: number, tipo: string }[]>([]);
  const [img1, setFileimg1] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then((data: { [key: string]: any }) => {
      if (data) {
        const allComponentes: { id: number, nombre: string, tipo: string }[] = Object.values(data).reduce((acc: any, val) => acc.concat(val), []);
        setComponentes(allComponentes);
      } else {
        console.error('Error: No data received from backend');
      }
    })
    .catch(error => console.error('Error fetching componentes:', error));
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!nombre || !descripcion || !img1 || selectedComponentes.length === 0) {
      alert('Por favor, rellene todos los campos')
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('imagen1', img1 as unknown as File);
    selectedComponentes.forEach(comp => {
      formData.append('componente[]', JSON.stringify(comp));
    });

    console.log('Nombre proyecto:', formData.get('nombre'));
    console.log('Descripción proyecto:', formData.get('descripcion'));
    console.log('Imagen 1:', formData.get('imagen1'));
    console.log('Componentes seleccionados:', selectedComponentes);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyect`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },

        body: formData,
      });
  
      if (response.ok) {
        console.log('Proyecto creado correctamente');
        navigate('/mostrarProy');
      } else {
        console.error('Error creating proyecto');
      }
    } catch (error) {
      console.error('Error creating proyecto:', error);
    }
  };
  const handleComponenteSelect = (id: number, nombre: string, tipo: string) => {
    setSelectedComponentes(prev => {
      const isSelected = prev.some(comp => comp.id === id && comp.tipo === tipo);
      if (isSelected) {
        return prev.filter(comp => !(comp.id === id && comp.tipo === tipo));
      } else {
        return [...prev, { id, tipo, nombre }];
      }
    });
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
      onSubmit={handleSubmit}
    >
      <h1>Formulario para agregar Proyectos</h1>
      <TextField 
        label="Nombre"
        id="outlined-size-normal"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        id="outlined-multiline-static"
        label="Descripción"
        multiline
        rows={4}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <table className='TablaComponentes'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
            {componentes.map((componente) => (
              <tr key={componente.id}>
                <td>{componente.id}</td>
                <td>{componente.nombre}</td>
                <td>{componente.tipo}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedComponentes.some(comp => comp.id === componente.id && comp.tipo === componente.tipo)}
                    onChange={(e) => handleComponenteSelect(componente.id, componente.nombre, componente.tipo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFileimg1(e.target.files ? e.target.files[0] : null)}
      />
      <Button type="submit" variant="contained">Agregar Proyecto</Button>
    </Box>
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



