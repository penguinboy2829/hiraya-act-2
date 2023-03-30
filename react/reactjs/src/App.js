import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home2";
import Card from "./component/Card";
import Landing from "./component/Landing";
import Project from "./component/Project";
import React from 'react';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/tixsys" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/tixsys/project" element={<Project/>} />
          <Route path="/tixsys/dashboard" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}