import React from "react";
import './style.css';
import { Expression } from './components/steps/expression/expression';

export default function App() {
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4) + d * e + f';
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f';
  const expression = 'a5 * $frac(b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f , 345 + 7654 + x) + 4 + $frac(1 + 2 , 4 + k * m) + 5';
  //console.log(parseExpression(expression));
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
      <div className="game-field">
        <Expression expression={expression}/>
      </div>
    </div>
    </>
  )
}