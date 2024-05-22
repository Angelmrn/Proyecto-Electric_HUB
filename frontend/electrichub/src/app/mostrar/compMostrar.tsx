"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import './mostrar.css';
import ResponsiveAppBar from '../responsiveappbar';
const imagen2 = '/Lupa.png';
const pages = ['Tools'];
const settings = ['Agregar Componente', 'Agregar Proyecto', 'Logout'];

export default function Mainpage() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-20 w-full'>
        <BuscarComp setSearchTerm={setSearchTerm} />
        <div className='flex flex-col md:flex-row justify-between items-center' style={{ height: 'auto' }}>
          <CeckboxComponentes setSelectedCategories={setSelectedCategories} />
          <TablaComp selectedCategories={selectedCategories} searchTerm={searchTerm} />
        </div>
      </div>
    </main>
  );
}

//----------------INPUT - componentes----------------

function BuscarComp({ setSearchTerm }: { setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '26vh' }}>
      <TextField
        id="outlined-basic"
        label="Buscar componente por id o Nombre"
        variant="outlined"
        sx={{ width: '42%' }}
        onChange={handleSearchChange}
      />
      <button className='botonBUSCAR'>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}

//----------------TABLA - COMPONENTES----------------

function TablaComp({ selectedCategories, searchTerm }: { selectedCategories: string[], searchTerm: string }) {
  const [componentes, setComponentes] = useState<any[]>([]); // Aquí guardamos los componentes
  const [filteredComponents, setFilteredComponents] = useState<any[]>([]);

  useEffect(() => {
    const ObtenerComponentes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/componentes`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          const allComponents = Object.values(data).flat();
          setComponentes(allComponents);
          setFilteredComponents(allComponents); // Inicialmente mostrar todos los componentes
        } else {
          console.error('Error fetching componentes:', response);
        }
      } catch (error) {
        console.error('Error fetching componentes:', error);
      }
    };

    ObtenerComponentes();
  }, []);

  useEffect(() => {
    // Filtrar componentes cuando cambian las categorías seleccionadas o el término de búsqueda
    
    const filtrarComponentes = () => {
      let filteredByName = componentes;

      if (searchTerm !== '') {
        filteredByName = componentes.filter(componente =>
          componente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          componente.id.toString() === searchTerm ||
          componente.tipo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    
      const filteredByCategory = filteredByName.filter(componente =>
        selectedCategories.length === 0 || selectedCategories.includes(componente.tipo)
      );
      
      setFilteredComponents(filteredByCategory);
    };

    filtrarComponentes();
  }, [ searchTerm]);

  return (
    <table className='TablaMostrarComp' style={{ marginLeft: '20vh' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {filteredComponents.length > 0 ? (
          filteredComponents.map((componente) => (
            <tr key={componente.id}>
              <td><Link to={`/compInfo/${componente.id}/${componente.tipo}/${componente.nombre}`}>{componente.id}</Link></td>
              <td><Link to={`/compInfo/${componente.id}/${componente.tipo}/${componente.nombre}`}>{componente.nombre}</Link></td>
              <td><Link to={`/compInfo/${componente.id}/${componente.tipo}/${componente.nombre}`}>{componente.tipo}</Link></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No hay componentes disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function CeckboxComponentes({ setSelectedCategories }: { setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>> }) {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        return prevCategories.filter((Categoria) => Categoria !== value);
      } else {
        return [...prevCategories, value];
      }
    });
  };

  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Categorias</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div  style={{margin: '10px 0',  width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente1" name="componente1" value="Accesorio" onChange={handleCheckboxChange}/>
          <label htmlFor="componente1" style={{margin:'5px'}}>Accesorios</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente2" name="componente2" value="Buzzer" onChange={handleCheckboxChange}/>
          <label htmlFor="componente2" style={{margin:'5px'}}>Buzzers</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente3" name="componente3" value="Electro Analogica" onChange={handleCheckboxChange} />
          <label htmlFor="componente3" style={{margin:'5px'}}>Electro Analogica</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente4" name="componente4" value="Electro Digital" onChange={handleCheckboxChange}/>
          <label htmlFor="componente4" style={{margin:'5px'}}>Electro Digital</label>  
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente5" name="componente5" value="Modulo"onChange={handleCheckboxChange} />
          <label htmlFor="componente5" style={{margin:'5px'}}>Modulos</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente6" name="componente6" value="Motor" onChange={handleCheckboxChange} />
          <label htmlFor="componente6" style={{margin:'5px'}}>Motores</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente7" name="componente7" value="Opto Electronica" onChange={handleCheckboxChange} />
          <label htmlFor="componente7" style={{margin:'5px'}}>Opto Electronica</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente8" name="componente8" value="Sensor" onChange={handleCheckboxChange} />
          <label htmlFor="componente8" style={{margin:'5px'}}>Sensores</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente9" name="componente9" value="Switch" onChange={handleCheckboxChange} />
          <label htmlFor="componente9" style={{margin:'5px'}}>Switches</label>
        </div>
      </div>
    </div>
  );
}
