import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./components/header/header";
import { LevelPage } from "./pages/levelPage/levelPage";
import { NavigatePage } from "./pages/navigatePage/navigatePage";
import './assets/fonts/fonts.css';
import './style.css';

export default function App() {
  
  return (
    <div className="app">
      <Header />
      <HashRouter>
      <Routes>
        <Route path="/level/:id" element={<LevelPage />} />
        <Route path="/" element={<NavigatePage />} />
      </Routes>
    </HashRouter>
    </div>
  )
}