"use client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./main/mainpage";
import Loginpage from "./login/loginpage";
import LoginCreate from "./login/logincreate"
import Addcomp from "./forms/componentes"
import Addproy from "./forms/proyectos"
import Tools from "./tools/tools"


const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Mainpage />} />
                <Route path = "/login" element = {<Loginpage />} />
                <Route path = "/create" element = {<LoginCreate/>} />
                <Route path = "/addComp" element = {<Addcomp/>} />
                <Route path = "/addProy" element = {<Addproy/>} />
                <Route path = "/tools" element = {<Tools/>} />
              
                
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;