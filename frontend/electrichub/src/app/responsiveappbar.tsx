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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"


const imagen = '/Electric-HUB_BotonInicio_SinFondo.png';
const pages = ['Tools'];
const settings = [
  { name: 'Mis Publicaciones', route: '/myPosts' },
  { name: 'Agregar Componente', route: '/addComp' },
  { name: 'Agregar Proyecto', route: '/addProy' },
  { name: 'Logout', route: '/login' },
];

function responsiveappbar({ isLoggedIn, username, first_name, handl}: { isLoggedIn: boolean, username: string, first_name: string, handl: () => void}) {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (route: string) => {
      if (route === '/login') {
        handleCloseUserMenu();
        handl(); // Solo cierra la sesión si la ruta es '/logout'
      }
       navigate(route); // Navega a la ruta especificadas
  };
  
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
      handl();
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
  
              {/*Si el usuario esta logeado muestra el nombre y las opciones de configuracion*/}
  
              {isLoggedIn ? (
  
              <Box>
                <Button sx={{ p: 0 , color:'#e3ecfcff', mr:10, mt:0.8}} onClick={handleOpenUserMenu}>
                  {username} {first_name}
                </Button>
  
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
                  <MenuItem key={setting.name} onClick={() => handleMenuClick(setting.route)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
  
              </Menu>
            </Box>
              
              ):( <Link to="/login">
  
                {/*Si el usuario esta logeado muestra el nombre y las opciones de configuracion*/}
  
                  <Tooltip title="Sign-Up">
                    <Button onClick={handleOpenUserMenu} sx={{ p: 0 , color:'#e3ecfcff', mr:10, mt:0.8}}>
                      LOGIN
                    </Button>
                  </Tooltip>
                </Link>
              )}
            </Box>
          </Toolbar>
      </AppBar>
    );
  }

  export default responsiveappbar;