import React, { useState } from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Addtask from './Addtask';
import SideNav from "../Sidenav";
import SideNavBar from './SideNavBar';
import Home from "./Home";
import Landing from "./Landing"

const Layout = () => {
  const location = useLocation();

  return (
    <div className="App">
      <div className = 'container-fluid'>
        <div className = 'row'>
          {location.pathname !== '/landing' && <SideNavBar />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;