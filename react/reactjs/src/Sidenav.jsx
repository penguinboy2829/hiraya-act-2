import React, { useState,useEffect }  from "react";
import icon4 from './icon4.png';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./sidebar.css";

export default function SideNav({}){

  const [isClosed,setIsClosed] = useState(false);

  function toggleClick() {
    setIsClosed(!isClosed);
  }
  
  return (
    <div className = {isClosed ? ('col-auto min-vh-100 px-5'):  ('col-auto min-vh-100 px-2')}
      style={{background: "linear-gradient(180deg, #00B7EB 60.94%, #00EB96 100%)",
        transition: "background-color 0.5s ease-in-out"
      }}>
      <header class="image-text d-flex justify-content-between align-items-center mt-2">
        <div class="image-text">
          <span class="image">
            <img src={icon4} alt=""/>
          </span>
          <div class="text logo-text d-flex align-items-center">
            <span class="name">Workspace</span>
          </div>
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right text-white border rounded-circle px-2 py-1 toggle" 
            style = {{right: "-25px"}}
            onClick = {toggleClick}>
          </i>
        </div>
        
      </header>
      <ul className="nav nav-pills flex-column d-flex justify-content-center mt-5">
        <Link className="nav-item py-3 px-3 mt-5 nav-outline d-flex justify-content-start align-items-center" 
          to = "/" 
          style = {{textDecoration: "none"}}>
            <li className="nav-link fas fa-home fa-lg text-white"></li>
            {isClosed ? (
              <span className = "text-white" style = {{fontSize: "17px"}}>Home</span>
              ) : 
              ("")
            }
        </Link>

        <Link className="nav-item py-3 px-3 mt-2 nav-outline d-flex justify-content-start align-items-center" 
          to = "/project"
          style = {{textDecoration: "none"}}>
            <li className="nav-link fas fa-layer-group fa-lg text-white"></li>
            {isClosed ? (
              <span className = "text-white" style = {{fontSize: "17px"}}>Project Page</span>
              ) : 
              ("")
            }
        </Link>

              <Link className="nav-item py-3 px-3 mt-2 nav-outline d-flex justify-content-start align-items-center" 
              to = "/landing"
              style = {{textDecoration: "none"}}>
                <li className="nav-link fas fa-cog fa-lg text-white"></li>
                {isClosed ? (
                  <span className = "text-white" style = {{fontSize: "17px"}}>Settings</span>
                ) : 
                ("")
                }
              </Link>
        </ul>
        </div>
      );
  }