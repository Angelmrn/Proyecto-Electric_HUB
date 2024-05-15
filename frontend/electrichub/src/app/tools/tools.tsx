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
          <div className='flex flex-col md:flex-col justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full' style={{ marginTop: '-5vh', boxSizing: 'border-box' }}>
            <div className='flex flex-row sm:items-center sm:text-center md:items-start md:text-left justify-center gap-6 rounded-lg bg-customise 
                w-full md:px-10 order-last md:order-first' style={{ width: 'auto', height: 'auto', boxSizing: 'border-box', backgroundColor: 'gray' }}>
              <RadioButtonColor1/>
              <RadioButtonColor2/>
              <RadioButtonColor3/>
              <RadioButtonColor4/>
              <ValorResistencia/>
            </div>
          </div>


    </main>
  );
}

//-----------------------RadioButtonColors-----------------------
function RadioButtonColor1() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh', backgroundColor:'green',margin:'1vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Banda 1</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color0_Banda1" name="banda1" value="color0" />
          <label htmlFor="color0">Negro</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color1_Banda1" name="banda1" value="color1" />
          <label htmlFor="color1">cafe</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color2_Banda1" name="banda1" value="color2" />
          <label htmlFor="color2">rojo</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color3_Banda1" name="banda1" value="color3" />
          <label htmlFor="color3">naranja</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color4_Banda1" name="banda1" value="color4" />
          <label htmlFor="color4">amarillo</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color5_Banda1" name="banda1" value="color5" />
          <label htmlFor="color5">verde</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color6_Banda1" name="banda1" value="color6" />
          <label htmlFor="color6">azul</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color7_Banda1" name="banda1" value="color7" />
          <label htmlFor="color7">violeta</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color8_Banda1" name="banda1" value="color8" />
          <label htmlFor="color8">gris</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color9_Banda1" name="banda1" value="color9" />
          <label htmlFor="color9">blanco</label>
        </div> 
      </div>
    </div>
  );
}

function RadioButtonColor2() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh', backgroundColor:'green',margin:'1vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Banda 2</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color0_Banda2" name="banda2" value="color0" />
          <label htmlFor="color0">Negro</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color1_Banda2" name="banda2" value="color1" />
          <label htmlFor="color1">cafe</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color2_Banda2" name="banda2" value="color2" />
          <label htmlFor="color2">rojo</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color3_Banda2" name="banda2" value="color3" />
          <label htmlFor="color3">naranja</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color4_Banda2" name="banda2" value="color4" />
          <label htmlFor="color4">amarillo</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color_Banda25" name="banda2" value="color5" />
          <label htmlFor="color5">verde</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color6_Banda2" name="banda2" value="color6" />
          <label htmlFor="color6">azul</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color7_Banda2" name="banda2" value="color7" />
          <label htmlFor="color7">violeta</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color8_Banda2" name="banda2" value="color8" />
          <label htmlFor="color8">gris</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color9_Banda2" name="banda2" value="color9" />
          <label htmlFor="color9">blanco</label>
        </div> 
      </div>
    </div>
  );
}

function RadioButtonColor3() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh', backgroundColor:'green',margin:'1vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Banda 3</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color0_Banda3" name="banda3" value="color0" />
          <label htmlFor="color0">Negro</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color1_Banda3" name="banda3" value="color1" />
          <label htmlFor="color1">cafe</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color2_Banda3" name="banda3" value="color2" />
          <label htmlFor="color2">rojo</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color3_Banda3" name="banda3" value="color3" />
          <label htmlFor="color3">naranja</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color4_Banda3" name="banda3" value="color4" />
          <label htmlFor="color4">amarillo</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color5_Banda3" name="banda3" value="color5" />
          <label htmlFor="color5">verde</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color6_Banda3" name="banda3" value="color6" />
          <label htmlFor="color6">azul</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color7_Banda3" name="banda3" value="color7" />
          <label htmlFor="color7">violeta</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color8_Banda3" name="banda3" value="color8" />
          <label htmlFor="color8">gris</label>
        </div> 
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color9_Banda3" name="banda3" value="color9" />
          <label htmlFor="color9">blanco</label>
        </div> 
      </div>
    </div>
  );
}

function RadioButtonColor4() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh', backgroundColor:'green', margin:'1vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Banda 4</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color0_Banda4" name="banda4" value="color0" />
          <label htmlFor="color0">Dorado</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color1_Banda4" name="banda4" value="color1" />
          <label htmlFor="color1">Plata</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="radio" id="color2_Banda4" name="banda4" value="color2" />
          <label htmlFor="color2">Rojo</label>
        </div>
      </div>
    </div>
  );
}

//-----------------------Mostrar Valor Resistencia-----------------------

function ValorResistencia() {
  return (
    <div style={{marginLeft:'5vh', maxWidth:'27vh', backgroundColor:'green', margin:'1vh'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Valor de la Resistencia</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <label  htmlFor="valor_resistencia">Valor de la Resistencia</label>
          <input style={{width:'10vh', backgroundColor:'transparent', border:'1px solid', color:'#e3ecfcff', borderTop:'0px', borderLeft:'0px', borderRight:'0px'}} type="text" id="valor_resistencia" name="valor_resistencia" value="0" />
        </div>
      </div>
      <button className='botonCalcularResistencia' style={{backgroundColor: '#1c3663ff',color: '#e3ecfcff', border: '1px solid', padding: '10px', margin: '5px', width: '26vh'}}>
        Calcular</button>
    </div>
  );
}






