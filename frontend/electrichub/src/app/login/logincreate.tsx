import React, { useState, MouseEvent } from "react";
import { ReactHTMLElement } from "react";
import './login.css'
import { Link } from "react-router-dom";


const colors ={
    color1: '#004aadff',
    color2: '#1c3663ff',
    color3: '#e3ecfcff'
}

const imagen = 'FondoComponentes.jpg'

/*const [BottonLog, setBottonLog ] =  useState('');
const [BottonBack, setBottonBack ] =  useState('');

const handleBottonLog = (event: any) =>{
    setBottonLog(event.target.value);
}

const handleBottonBack = (event: any) =>{
    setBottonBack(event.target.value);
}*/

//Eventos 
/*const [UserName, setUserName] = useState('');
const [UserEmail, setUserEmail] = useState('');
const [UserPassword, setUserPassword] = useState('');
const [UserPassword2, setUserPassword2] = useState('');

const handleUserName = (event: any) => {
    setUserName(event.target.value);
}

const handleUserEmail = (event: any) => {
    setUserEmail(event.target.value);
}

const handleUserPassword = (event: any) => {
    setUserPassword(event.target.value);
}

const handleUserPassword2 = (event: any) => {
    setUserPassword2(event.target.value);
}*/

//HTML && CSSS
const Login = () => {

    return (
        <div className='IntCreate'>
            <div className="DatosCreate">
              <div>
                <h1 className= "SignUP" color="#e3ecfcff">SIGN UP</h1>
              </div>
                <div className="EntrysCreate">
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">User Name</span>
                        </label>
                        <input type="text" placeholder="Nombre Completo"/>
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Email</span>
                        </label>
                        <input type="email" placeholder="Codigo@zapopan.tecmm.edu.mx"/>
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Password</span>
                        </label>
                        <input type="password" placeholder="Maximo 10 digitos"/>
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Repeat Password</span>
                        </label>
                        <input type="password" placeholder="Repetir Contraseña"/>
                    </div>

                    <div className="BottonLog">
                        <button className="btnCreate">Create Account</button>
                    </div>

                    <div className="BottonBack">
                        <Link to='/login'>
                            <button className="btnBack">Back</button>
                        </Link>
                        
                    </div>   
                </div>
                
            </div>
            <div className="ImgCreate">
                <img src="FondoComponentes.jpg" alt="Imagen de Fondo" className="ImgFondo"/>
            </div>
        </div>
    )
}

export default Login;