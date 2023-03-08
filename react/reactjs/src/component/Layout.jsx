import Home from "./Home";
import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import SideNav from "../Sidenav";

const Layout = () => {
  return (
    <div className="App">
      <div className = 'container-fluid'>
        <div className = 'row'>
          <SideNav /> 
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;