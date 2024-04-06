import reacr from 'react';
import './login.css'
import { Link } from 'react-router-dom'

const colors = {	
    color1: '#004aadff',
    color2: '#1c3663ff',
    color3: '#e3ecfcff'
}

const imagen = 'User.png'
const logo = 'Electric-HUB_Sinfondo.png'

const Login = () => {
    return (
        <div className='w-full h-screen flex items-start'>

            <div className='InicioLogin'>
                
                <div className='ImgLogo'>
                    <img src='Electric-HUB_Sinfondo.png'></img>
                </div>

                <div className='Letras'>
                    <span className='Bienvenida'>
                        ¡Hola! Bienvenido a <span className='Electric'> Electric - </span> <span className='HUB'>HUB</span>
                    </span>
                </div>
    
            </div>

            <div className='LoginDatos'>

                <div className='ImgLogin'>
                    <img className='ImgUser' src='User.png'></img>
                </div>

                <div className='EntrysLogin'>
                    <div>
                        <label className='lblLogin'>Email</label>
                        <input placeholder='zaCodigo@zapopan.tecmm.edu.mx'/>
                    </div>
                   <div>
                        <label className='lblLogin'>Contraseña</label>
                        <input placeholder='Contraseña'/>
                   </div>

                   <div className='BotonesLogin'>
                        <div>
                            <button className='Login'>Login</button>
                        </div>
                       
                        <div>
                            <Link to='/create'>
                                <button className='Create_Account'>Create Account</button>
                            </Link>
                        </div>

                        <div>
                            <Link to='/'>
                                <button className='Go_Back'>Go Back</button>
                            </Link>
                        </div>

                       
                        
                   </div>

                </div>
            </div>

        </div>
    )
}

export default Login;