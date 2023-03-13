import React, { useState } from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Addtask from './Addtask.js';
import SideNav from "../Sidenav";
import Home from "./Home";
import Landing from "./Landing"

const Layout = () => {
  const location = useLocation();

  return (
    <div className="App">
      <div className = 'container-fluid'>
        <div className = 'row'>
          {location.pathname !== '/landing' && <SideNav />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;