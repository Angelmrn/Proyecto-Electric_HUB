import React, { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import './login.css'

const Login = () => {
    const [UserName, setUserName] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserPassword2, setUserPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUser = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        // Verificar que las contraseñas sean iguales
        if (UserPassword !== UserPassword2) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        setErrorMessage('');

        // Si las contraseñas coinciden, proceder con la lógica de envío del formulario
        console.log(UserName, UserEmail, UserPassword, UserPassword2);
        const res = await fetch('${process.env.NEXT_PUBLIC_BACKEND_URL}/djapi/users/', {
            method: 'POST',
            body: JSON.stringify({
                username: UserName,
                email: UserEmail,
                password: UserPassword
            }),

            headers: {
                'Content-Type': 'application/json'
            }

        });

        const data = await res.json();
        if (res.ok){
            localStorage.setItem('token', data.token)
        }else{
            console.error(data.error)
        }
    }

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
                        <input type="text" placeholder="Nombre Completo"
                        onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Email</span>
                        </label>
                        <input type="email" placeholder="Codigo@zapopan.tecmm.edu.mx"
                        onChange={e => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Password</span>
                        </label>
                        <input type="password" placeholder="Maximo 10 digitos"
                        onChange={e => setUserPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="lblCreate">
                            <span className="SpanCreate">Repeat Password</span>
                        </label>
                        <input type="password" placeholder="Repetir Contraseña"
                        onChange={e => setUserPassword2(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                    <div className="BottonLog">
                        <button className="btnCreate" onClick={handleUser}>Create Account</button>
                    </div>
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
