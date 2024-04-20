"use client";

import * as React from 'react';
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



const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/cont_binario.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];


export default function Mainpage(){
  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg  md:h-80 w-full">
        <ResponsiveAppBar />
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise px-6 py-0 md:px-10 w-full md:mt-[-15vh]' style={{ boxSizing: 'border-box'}}>
        <div className={`flex flex-col justify-center gap-6 rounded-lg bg-customise 
              w-full md:px-10 md:mt-[-15vh] sm:mt-[10vh] sm:items-center sm:text-center md:items-start md:text-left`} style={{ width: '100vw', height: 'auto', boxSizing: 'border-box'}}>
            <ImagenProyecto />
            <MostrarInformacionProyecto />
        </div>
          <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise w-full md:px-10 ' style={{ width: '100vw', height: '100vh', 
              boxSizing: 'border-box' }}>
            <TablacomponentesElavoracionProyecto />
          </div>
        </div>


    </main>
  );
}

//----------------APPBAR----------------
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1c3663ff', padding: 0,
     width: '100%', height:'80%', paddingTop: 8, position: 'relative'}}>
     
     <Toolbar disableGutters sx={{ marginTop:'-5vh'  }}>
        <Link to="/">
          <button className='botonLOGO'>
            <img className = 'imagenlogo' src={imagen} alt="logo" />
          </button>
        </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' } }}>
            <Link to="/tools">
              <Button style={{color: '#e3ecfcff',  marginRight: '50px'}} className='TOOLSBUTTON'>
                TOOLS
              </Button>
            </Link>
            <Link to="/login">
              <Tooltip title="Sign-Up">
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 , color:'#e3ecfcff', mr:10, mt:0.8}}>
                  LOGIN
                </Button>
              </Tooltip>
            </Link>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      
    </AppBar>
  );
}


//----------------- IMAGEN-componentesINFO----------------

function ImagenProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 md:py-5 w-full' style={{  height: '250px', width: '300px', marginTop:'-13vh' }}>
      <label className='NombreProyecto'>Nombre del Proyecto</label>
      <img src={imagen2} alt="imagenComponente" />
    </div>
  );
}


//----------------- MOSTRAR InformacionComponente ----------------

function MostrarInformacionProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-5 w-full' style={{  height: 'auto', width: '300px' }}>
      <Card style={{ marginTop: '-60px', width: '150%', height: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Informacion del Proyecto
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ wordWrap: 'break-word' }}>
            Informacion 
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

//----------------- TABLA - componentesElavoracionProyecto ----------------

function TablacomponentesElavoracionProyecto(){
  return(
    <div className='flex flex-col justify-center gap-6 rounded-lg
    px-6 py-20 md:px-10 w-full' style={{  height: 'auto', width: 'auto', marginTop:'-35vh' }}>

      <table className='TablaComponentesParecidos' style={{marginTop:'-10vh'}}>
      <caption style={{captionSide: 'top'}}>Componentes para elaborar el Proyecto</caption>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nombre 1</td>
          <td>Imagen 2</td>
        </tr>
        <tr>
          <td>Nombre 2</td>
          <td>Imagen 2</td>
        </tr>
        <tr>
          <td>Nombre 3</td>
          <td>Imagen 3</td>
        </tr>  
      </tbody>
      </table>
    </div>
  );
}



