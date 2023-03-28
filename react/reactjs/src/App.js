import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home2";
import Card from "./component/Card";
import Landing from "./component/Landing";
import Project2 from "./component/Project2";
import React from 'react';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tixsys" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tixsys/project" element={<Project2/>} />
          <Route path="/tixsys/login" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}