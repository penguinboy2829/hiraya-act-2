import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import SideNavBar from './SideNavBar';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="App">
      <div className = 'container-fluid'>
        <div className = 'row '>
          {location.pathname !== '/' && <SideNavBar />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;