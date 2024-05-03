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
const imagen2 = '/Lupa.png';
const pages = ['Tools'];
const settings = [ 'Agregar Componente', 'Agregar Proyecto', 'Logout'];



export default function Mainpage({}){

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
      <div className='flex flex-col justify-center gap-6 rounded-lg bg-customise
            px-6 py-0 md:px-20 w-full'>
        <Selector/>
        <Carrusel/>
        <Botones />

      </div>
    </main>
  );
}


//----------------APPBAR----------------
function ResponsiveAppBar({ isLoggedIn, username, first_name, handl}: { isLoggedIn: boolean, username: string, first_name: string, handl: () => void}) {
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
    handl();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1c3663ff', padding: 0,
     width: '100%', height:'80%', paddingTop: 8, position: 'relative'}}>
     
     <Toolbar disableGutters sx={{ marginTop:'-5vh'  }}>
          <button className='botonLOGO'>
            <img className = 'imagenlogo' src={imagen} alt="logo" />
          </button>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
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

//----------------SELECTOR - componentes/proyectos----------------

function Selector() {
  const [Buscar, setBuscar] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setBuscar(event.target.value as string);
  };

  const handleSearch = () => {
    if (Buscar === 'componentes') {
      navigate('/mostrarComp');
    } else if (Buscar === 'proyectos') {
      navigate('/mostrarProy');
    }
  };
  return (
    <Box sx={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl sx={{ width: '40%' }}>
        <InputLabel id="demo-simple-select-label">Buscar</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Buscar}
          label="Buscar"
          onChange={handleChange}
        >
          <MenuItem value='componentes'>Componentes</MenuItem>
          <MenuItem value='proyectos'>Proyectos</MenuItem>
        </Select>
      </FormControl>
      <button className='botonBUSCAR' onClick={handleSearch}>Buscar
        <img src={imagen2} />
      </button>
    </Box>
  );
}


//----------------CARRUSEL - proyectos----------------
const data=[
  {
    name : 'Proyecto 1',
    description : 'Descripcion del proyecto 1',
    image : '/semaforo.png'
  },
  {
    name: 'Proyecto 2',
    description: 'Descripcion del proyecto 2',
    image: '/cont_binario.png'
  },
  {
    name: 'Proyecto 3',
    description: 'Descripcion del proyecto 3',
    image: '/Piano.png'
  }
]

function Carrusel(){
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      }else{
        setSlidesToShow(3);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1
  };
  return(
    
  <div className='w-1/2 m-auto'>
    
    <div className='mt-10'> {/* Cambiado de mt-20 a mt-10 */}
    Ultimos Proyectos Agregados
    <Slider {...settings}>
      {data.map((d) => (
        <div className='bg-customise h-[400px] text-black rounded-xl'> {/* No necesitas el margen aquí */}
          <div className='rounded-t-xl flex justify-center items-center'>
            <img src={d.image} alt='' className='h-44 w-64'/>
          </div>

          <div className='flex flex-col justify-center items-center gap-4 p-2'>
            <p>{d.name}</p>
            <p>{d.description}</p> 
            <button className='BotonCARRUSEL'>Ver</button>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  </div>
  );
}

//----------------BOTONES-PRUEBAS----------------
function Botones(){
  return(
    <div>
        <div>
            <Link to='/addComp'>
          <button >Add Componentes</button>
          </Link>
          <Link to='/addProy'>
          <button>, Add  Proyectos</button>
          </Link>
        </div>   
</div>
  );
}

