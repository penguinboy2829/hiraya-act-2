import React, { useState,useEffect }  from "react";
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./sidebar.css";

export default function SideNav2({}){

  const [isClosed,setIsClosed] = useState(false);

  function toggleClick() {
    setIsClosed(!isClosed);
  }

  return (
    <div className = {isClosed ? ('col-auto min-vh-100 px-5'):  ('col-auto min-vh-100 px-1')}
      style={{background: "linear-gradient(180deg, #00B7EB 60.94%, #00EB96 100%)",
        transition: "translateY(-50%) rotate(0deg)"
      }}>
      <body>
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="icon4.png" alt="" />
                </span>

                <div class="text logo-text">
                    <span class="name">Workspace</span>
                </div>
            </div>

            <i class='bx bx-chevron-right toggle' onClick = {toggleClick}></i>
        </header>

        <div class="menu-bar">
            <div class="menu">

                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="/">
                            <i className="fas fa-home fa-lg text-white"></i>
                            <span class="text nav-text">Home</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="/project">
                            <i className="fas fa-home fa-lg text-white"></i>
                            <span class="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <i className="fas fa-home fa-lg text-white"></i>
                            <span class="text nav-text">Settings</span>
                        </a>
                        
                    </li>
                    <li class="profile">
                    
                            <img src="icon2.png" alt="" />   
                            <span class="name">Steven</span>  
                    </li>
                    

                </ul>
            </div>

            <div class="bottom-content">
                <li class="">
                    <a href="#">
                        <i class='bx bx-log-out icon' ></i>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>

            </div>
        </div>

    </nav>
    </body>
        </div>
      );
  }