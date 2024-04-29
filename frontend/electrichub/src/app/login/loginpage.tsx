"use client"

import React, { useState } from 'react'
import './login.css'
import { Link , Navigate, useNavigate} from 'react-router-dom'

const colors = {	
    color1: '#004aadff',
    color2: '#1c3663ff',
    color3: '#e3ecfcff'
}

const imagen = 'User.png'
const logo = 'Electric-HUB_Sinfondo.png'

const Login = () => {

    const Navigate = useNavigate();
    const [UserEmail, setEmail] = useState('');
    const [UserPassword, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        e.preventDefault();

        //Verificar que los campos no estén vacíos
        if (!UserEmail || !UserPassword) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        // Validar el formato del correo electrónico
        if (!UserEmail.endsWith('@zapopan.tecmm.edu.mx')) {
            setErrorMessage('Correo solo: @zapopan.tecmm.edu.mx');
            return;
        }

        // Si las contraseñas coinciden, proceder con la lógica de envío del formulario
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email : UserEmail,
                password: UserPassword
            }),

            headers: {
                'Content-Type': 'application/json'
            }

        });

        const data = await res.json();

        // Verificar si hay errores en la respuesta del backend
        if (res.ok) {
            // El inicio de sesión fue exitoso, redirigir al usuario
            setEmail('');
            setPassword('');
            Navigate('/MainPage');
        } else {
            // Hubo un error en el inicio de sesión, mostrar el mensaje de error del backend
            setErrorMessage(data.error);
        }

    }


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

                    <div className='w-full'>
                        <label className='lblLogin'>Email</label>
                        <input placeholder='zaCodigo@zapopan.tecmm.edu.mx'
                        value={UserEmail}
                        onChange={ e => setEmail (e.target.value)}
                        className={errorMessage && !UserEmail ? 'missingField2' : ''}
                        />
                    </div>

                   <div>
                        <label className='lblLogin'>Contraseña</label>
                        <input placeholder='Contraseña'
                        type='password'
                        value={UserPassword}
                        onChange={ e => setPassword (e.target.value)}
                        className={errorMessage && !UserPassword ? 'missingField2' : ''}
                        />
                   </div>

                   {errorMessage && <div className="errorMessage2">{errorMessage}</div>}

                   <div className='BotonesLogin'>


                        <div>
                            <button className='Login' onClick={handleUser}>Login</button>
                        </div>
                       
                        <div>
                            <Link to='/create'>
                                <button className='Create_Account'>Create Account</button>
                            </Link>
                        </div>

                        <div>
                            <Link to='/Mainpage'>
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