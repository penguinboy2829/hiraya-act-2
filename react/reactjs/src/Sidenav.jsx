import React, { useState }  from "react";
import pficon from '../assets/icon2.png';
import { Link } from "react-router-dom";
import "./sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SideNav(){

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
          <div class="image">
            <img src="" alt=""/>
          </div>
          {isClosed 
          ? (<div class="text logo-text">
          <span class="name">Workspace</span>
          </div>)
          :(null)}
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right text-white border rounded-circle px-2 py-1 toggle" 
            onClick = {toggleClick}>
          </i>
        </div>
        
        <hr className="sidebar-divider my-0" />


      </header>
      <hr className="sidebar-divider my-0" />

      <ul className="nav nav-pills flex-column d-flex justify-content-center align-items-center mt-5">
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
        <hr className="sidebar-divider my-0" />

        <div class="position-absolute bottom-0 start-0 mb-5 p-4">
          <div class="image-text d-flex justify-content-between align-items-center">

            <div class="image1">
              <img id="profile" src={pficon} alt=""/>
            </div>
            {isClosed ?(<div class="text-white py-2">
              Steven j.
            </div>)
            :
            (null)}
            
                </div>

        <Link className="nav-item py-3 px-3 mt-2 nav-outline d-flex justify-content-start align-items-center" 
          to = "/landing"
          style = {{textDecoration: "none"}}>
            <li className="nav-link fa-solid fa-arrow-right-from-bracket fa-lg text-white"></li>
            {isClosed ? (
              <span className = "text-white" style = {{fontSize: "17px"}}>Logout</span>
              ) : 
              (null)
            }
        </Link>
            </div>
          </ul>
        </div>
        
      );
  }
