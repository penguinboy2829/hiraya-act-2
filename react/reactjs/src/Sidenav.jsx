import React from "react";
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function SideNav({}){
    return (
          <div className = 'col-auto min-vh-100 p-3'style={{
            background: "linear-gradient(180deg, #00B7EB 60.94%, #00EB96 100%)"
            }}>
            <img src = {logo} />
            <ul className="nav nav-pills pt-2 flex-column">
              <li className="nav-item p-3 mt-5 nav-outline">
                <Link className="nav-link fas fa-home fa-lg" to = "/"></Link>
              </li>
              <li className="nav-item p-3 mt-3">
                <Link className="nav-link fas fa-layer-group fa-lg" to = "/project"></Link>
              </li>
              <li className="nav-item p-3 mt-3">
                <a className="nav-link fas fa-cog fa-lg" href="/landing"> </a>
              </li>
            </ul>
          </div>
      );
  }