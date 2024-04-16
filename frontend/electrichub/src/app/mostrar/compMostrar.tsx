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
import { Link } from "react-router-dom"
import './mostrar.css'



const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const imagen2 = '/Lupa.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];


export default function Mainpage(){
  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className="flex h-40 shrink-0 items-start rounded-lg  md:h-80 w-full">
        <ResponsiveAppBar />
      </div>
      <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise
            px-6 py-0 md:px-20 w-full'>
              MOSTRAR COMPONENTES
        <BuscarComp />
        <div className='flex flex-row justify-between' style={{ height:'auto'}}>
          <CeckboxComponentes />
          <TablaComp />
        </div>
        <BotonesPrueba />
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
          <Link to='/'>
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
          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
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
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <Link to="/tools">
              <Button style={{color: '#e3ecfcff',  marginRight: '50px'}} className='TOOLSBUTTON'>
                TOOLS
              </Button>
            </Link>
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
          <Link to="/login">
            <Tooltip title="Sign-Up">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0 , color:'#e3ecfcff', mr:10}}>
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

//----------------INPUT - componentes----------------

function BuscarComp() {
  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:'26vh' }}>
      <TextField id="outlined-basic" label="Buscar componente por id o Nombre" variant="outlined" sx={{ width: '42%' }} />
      <button className='botonBUSCAR'>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}


//----------------TABLA - COMPONENTES----------------

function TablaComp() {  
  return (
    <table className='TablaMostrarComp'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ID 1</td>
          <td>Nombre 1</td>
          <td>Categoria 1</td>
        </tr>
        <tr>
          <td>ID 2</td>
          <td>Nombre 2</td>
          <td>Categoria 2</td>
        </tr>
        <tr>
          <td>ID 3</td>
          <td>Nombre 3</td>
          <td>Categoria 3</td>
        </tr>
        
      </tbody>
    </table>
  );
}

function CeckboxComponentes() {
  return (
    <div style={{marginLeft:'50px'}}>
      <h2 style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', backgroundColor:'#1c3663ff', color:'#e3ecfcff', textAlign:'center'}}>
        Categorias</h2>
      <div style={{border: '2px solid #1c3663ff', padding: '10px', margin: '5px', height:'auto', width:'auto'}}>
        <div style={{margin: '10px 0',  width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente1" name="componente1" value="componente1" />
          <label htmlFor="componente1"> Componente 1</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente2" name="componente2" value="componente2" />
          <label htmlFor="componente2"> Componente 2</label>
        </div>
        <div style={{margin: '10px 0', width:'auto', paddingLeft:'10px', paddingRight:'10px'}}>
          <input type="checkbox" id="componente3" name="componente3" value="componente3" />
          <label htmlFor="componente3"> Componente 3</label>
        </div>
      </div>
    </div>
  );
}

//----------------BOTONES - PRUEBAS----------------

function BotonesPrueba() {
  return(
  <div>
  <Link to='/Compinfo'>
    <button>, Mostrar-InfoComponentes</button>
    </Link>
  </div>
  );
}
