"use client"

import React, { useState, MouseEvent } from "react";
import { Link , Navigate, useNavigate } from "react-router-dom";
import './login.css'
import { Email, Password } from "@mui/icons-material";


const Login = () => {

    const Navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserPassword2, setUserPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleUser = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        //Verfificar que los campos no estén vacíos
        if (!UserName || !FirstName|| !LastName || !UserEmail || !UserPassword || !UserPassword2) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        // Verificar que las contraseñas sean iguales
        if (UserPassword !== UserPassword2) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        // Validar la longitud de la contraseña
        if (UserPassword.length > 10) {
            setErrorMessage('La contraseña debe tener como máximo 10 caracteres.');
            return;
        }

        // Validar el formato del correo electrónico
        if (!UserEmail.endsWith('@zapopan.tecmm.edu.mx')) {
            setErrorMessage('Correo solo: @zapopan.tecmm.edu.mx');
            return;
        }

        setErrorMessage('');

        // Si las contraseñas coinciden, proceder con la lógica de envío del formulario
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({
                username : UserName,
                first_name: FirstName,
                last_name: LastName,
                email : UserEmail,
                password: UserPassword
            }),

            headers: {
                'Content-Type': 'application/json'
            }

        });

        const data = await res.json();

        // Verificar si hay errores en la respuesta del backend
        if (res.status === 400) {

            setErrorMessage(data.error); // Mostrar el mensaje de error al usuario

        }else{
            // Limpiar los campos del formulario
            setUserName('');
            setFirstName('');
            setLastName('');
            setUserEmail('');
            setUserPassword('');
            setUserPassword2('');

            Navigate('/login');
        }
    }

    return (
        <div className='IntCreate'>
            <div className="DatosCreate">
                <div>
                    <h1 className= "SignUP" color="#e3ecfcff">SIGN UP</h1>
                </div>
                <div className="EntrysCreate">

                    {/*INPUT NOMBRE*/}

                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Nombre</span>
                        </label>
                        <input type="text" placeholder="Solo un nombre"
                        value={UserName}
                        onChange={e => setUserName(e.target.value)}
                        className={errorMessage && !UserName ? 'missingField' : ''}/>
                    </div>  

                    {/*INPUT APELLIDOS*/}

                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Primer Apellido</span>
                        </label>
                        <input type="text" placeholder="Materno"
                        value={FirstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={errorMessage && !FirstName ? 'missingField' : ''}/>
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Segundo Apellido</span>
                        </label>
                        <input type="text" placeholder="Paterno"
                        value={LastName}
                        onChange={e => setLastName(e.target.value)}
                        className={errorMessage && !LastName ? 'missingField' : ''}/>
                    </div>

                    {/*INPUT EMAIL*/}

                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Email</span>
                        </label>
                        <input type="email" placeholder="Codigo@zapopan.tecmm.edu.mx"
                        value={UserEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        className={errorMessage && !UserEmail ? 'missingField' : ''}/>
                    </div>

                    {/*INPUT PASSWORD*/}

                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Password</span>
                        </label>
                        <input type="password" placeholder="Maximo 10 digitos"
                        value={UserPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        className={errorMessage && !UserPassword ? 'missingField' : ''}/>
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Repeat Password</span>
                        </label>
                        <input type="password" placeholder="Repetir Contraseña"
                        value={UserPassword2}
                        onChange={e => setUserPassword2(e.target.value)}
                        className={errorMessage && !UserPassword2 ? 'missingField' : ''}/>
                    </div>

                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}


                    {/*BOTON CREAR CUENTA*/}

                    <div className="BottonLog">
                        <button className="btnCreate" onClick={handleUser}>Create Account</button>
                    </div>

                    {/*BOTON REGRESAR*/}
                    
                    <div className="BottonBack">
                        <Link to='/login'>
                            <button className="btnBack">Back</button>
                        </Link>
                    </div>   


                </div>    
            </div>
            <div className="ImgCreate" >
                <img src="FondoComponentes.jpg" alt="Imagen de Fondo" className="ImgFondo"/>
            </div>
        </div>
    )
}

export default Login;
