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
import Proyinfo from "./informacion/proyInfo"
import CompMostrar from "./mostrar/compMostrar"
import ProyMostrar from "./mostrar/proyMostrar"
import Posts from "./posts/posts"
import ModifyComponente from "./actualizar/altercomp"
import ModifyProy from "./actualizar/alterproy"


const MyRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainpage/>} />
                <Route path="/MainPage" element={<Mainpage/>} />
                <Route path = "/login" element = {<Loginpage />} />
                <Route path = "/create" element = {<LoginCreate/>} />
                <Route path = "/addComp" element = {<Addcomp/>} />
                <Route path = "/addProy" element = {<Addproy/>} />
                <Route path = "/tools" element = {<Tools/>} />
                <Route path="/compInfo/:id/:tipo/:nombre" element={<Compinfo />} />
                <Route path = "/proyInfo/:id/:nombre" element = {<Proyinfo />} />
                <Route path = "/mostrarComp" element = {<CompMostrar />} />
                <Route path = "/mostrarProy" element = {<ProyMostrar />} />
                <Route path = "/myPosts" element = {<Posts />} />
                <Route path = "/modifyComp/:id/:tipo/:nombre" element = {<ModifyComponente />} />
                <Route path = "/modifyProy/:id" element = {<ModifyProy />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;