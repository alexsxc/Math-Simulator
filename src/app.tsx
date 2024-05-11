import React from "react";
import './style.css';

export default function App() {
  return (
    <>
    <header>
      <div className="logo">
        <img src="" alt="" />
        <p>Математический тренажер</p>
      </div>
    </header>
    <div className="wrapper">
      <div className="status-bar">
        <div className="level-path">Тренажер / Арифметические действия с обыкновенными дробями. Умножение.</div>
        <div className="level-progress"></div>
        <div className="step"></div>
        <button className="next-level"></button>
      </div>
      <div className="game-field"></div>
    </div>
    </>
  )
}