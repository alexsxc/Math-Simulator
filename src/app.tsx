import React from "react";
import './style.css';
import { Expression } from './components/steps/expression/expression';
import { parseExpression } from "./parsers";
import { Level } from "./components/level/level";

export default function App() {
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4) + d * e + f';
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f';
  // const expression = 'a@5 * $frac(b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f , 345 + 7654 + x) + 4 + $frac(1 + 2 , 4 + k * m) + 5';
  const expressionP = '$frac(1, 3) * $frac(2, 6)';
  const expression1 = '$frac(a@1, 3) * $frac(b@2, 6)';
  const expression = '$frac(a@6 * b@5 + c@3, 5) * $frac(d@7 * e@6 + f@1, 6)';
  const parsedExpression = parseExpression(expression);
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
        <Level steps={[expressionP, expression1, expression]}></Level>
        {/*<Expression expression={parsedExpression} onChangeCorrectState={(isCorrect) => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", isCorrect)}/>*/}
      </div>
    </div>
    </>
  )
}