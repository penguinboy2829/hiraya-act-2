import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Landing from "./component/Landing";
import Project2 from "./component/Project2";
import Addtask from './component/Addtask';
import React, { useState } from 'react';
import SideNav from "./Sidenav";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="project" element={<Project2 />} />
          <Route path="landing" element={<Landing />} />
          <Route path="addtask" element={<Addtask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}