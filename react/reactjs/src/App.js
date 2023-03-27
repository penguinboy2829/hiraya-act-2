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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/project" element={<Project2/>} />
          <Route path="landing" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}