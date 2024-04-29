"use client";
import React, { useState } from 'react';
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
      
        <div className='flex flex-col md:flex-row justify-center gap-6 rounded-lg bg-customise
              px-6 py-10 md:px-20 ' >
          <div className='flex flex-col justify-center'>
            <FormularioComp />
            <button >Subir Componente</button>
          </div>
          <div className='flex flex-col justify-center'>
            <FileUploadComponent />
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

//----------------FORMULARIO----------------

function FormularioComp (){
  const [tipo, setTipo] = React.useState('');

      const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
        setTipo(event.target.value as string);
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
        >
          
           <div><h1> Formulario para agregar Componentes </h1></div>
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField label="Nombre" id="outlined-size-normal"/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipo}
                  label="Tipo"
                  onChange={handleChange}
                >
                  <MenuItem value='componente3'>Electronica Analogica</MenuItem>
                  <MenuItem value='componente4'>Electronica Digital</MenuItem>
                  <MenuItem value='componente7'>Opto Electronica</MenuItem>
                  <MenuItem value='componente1'>Accesorios</MenuItem>
                  <MenuItem value='componente2'>Buzzers</MenuItem>
                  <MenuItem value='componente5'>Modulos</MenuItem>
                  <MenuItem value='componente6'>Motores</MenuItem>
                  <MenuItem value='componente8'>Sensores</MenuItem>
                  <MenuItem value='componente9'>Switch</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Box>
      );
}

//----------------SUBIR IMAGEN----------------

function FileUploadComponent() {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  const handleFileUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage1(imageUrl);
    }
  };

  const handleFileUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage2(imageUrl);
    }
  };

  const handleRemoveImage1 = () => {
    setImage1(null);
  };

  const handleRemoveImage2 = () => {
    setImage2(null);
  };

  return (
    <div style={{ width: '250px', height: '250px' }}>
      <div style={{ margin: '10px', width: '400px', height: '250px' }}>
        <input type="file" accept=".png" onChange={handleFileUpload1} />
        {image1 && (
          <>
            <img src={image1} alt="Selected" style={{ width: '80%', height: '80%' }} />
            <button onClick={handleRemoveImage1}>Eliminar imagen</button>
           
          </>
        )}
      </div>
      <div style={{ margin: '10px', width: '400px', height: '250px' }}>
        <input type="file" accept=".png" onChange={handleFileUpload2} />
        {image2 && (
          <>
            <img src={image2} alt="Selected" style={{ width: '80%', height: '80%' }} />
            <button onClick={handleRemoveImage2}>Eliminar imagen</button>
            
          </>
        )}
      </div>
    </div>
  );
}




