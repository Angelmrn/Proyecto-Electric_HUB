"use client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./main/mainpage";
import Loginpage from "./login/loginpage";
import LoginCreate from "./login/logincreate"
import Addcomp from "./forms/componentes"
import Addproy from "./forms/proyectos"
import Tools from "./tools/tools"
import Compinfo from "./informacion/compInfo"
import Proyinfo from "./informacion/ptoyInfo"
import CompMostrar from "./mostrar/compMostrar"
import ProyMostrar from "./mostrar/proyMostrar"


const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Proyinfo />} />
                <Route path = "/login" element = {<Loginpage />} />
                <Route path = "/create" element = {<LoginCreate/>} />
                <Route path = "/addComp" element = {<Addcomp/>} />
                <Route path = "/addProy" element = {<Addproy/>} />
                <Route path = "/tools" element = {<Tools/>} />
                <Route path = "/compInfo" element = {<Compinfo />} />
                <Route path = "/proyInfo" element = {<Proyinfo />} />
                <Route path = "/mostrarComp" element = {<CompMostrar />} />
                <Route path = "/mostrarProy" element = {<ProyMostrar />} />
              
                
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;