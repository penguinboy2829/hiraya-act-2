import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Project from "./pages/Project";
import React from 'react';
import './App.css';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/dashboard/project" element={<Project/>} />
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}