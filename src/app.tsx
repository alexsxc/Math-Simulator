import React from "react";
import { Header } from "./components/header/header";
import { Expression } from './components/steps/expression/expression';
import { parseExpression } from "./parsers";
import { Level } from "./components/level/level";
import { LevelProgress } from "./components/levelProgress/levelProgress";
import { StepProgress } from "./components/stepProgress/stepProgress";
import './assets/fonts/fonts.css';
import './style.css';

export default function App() {
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4) + d * e + f';
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f';
  const expressionP = 'a@5 * $frac(b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f , 345 + 7654 + x * $frac(1 + 2 , 4 + k * m)) + 4 + $frac(1 + 2 , 4 + k * m) + 5';
  //const expressionP = '$frac(1, 3) * $frac(2, 6)';
  const expression1 = '$frac(a@1, 3) * $frac(b@2, 6)';
  const expression = '$frac(a@6 * b@5 + c@3, 5) * $frac(d@7 * e@6 + f@1, 6)';
  const parsedExpression = parseExpression(expression);
  //console.log(parseExpression(expression));
  return (
    <>
      <Header />
      <div className="app__wrapper">
        <div className="status-bar">
          <div className="status-bar__path-wrapper">
            <div className="level-path">
              <p className="level-path__item">Тренажер / Арифметические действия с обыкновенными дробями. </p>
              <p className="level-path__item">Умножение.</p>
            </div>
          </div>
          <div className="status-bar__progress progress">
            <LevelProgress completeCount={0} totalCount={15}></LevelProgress>
            <StepProgress completeCount={0} totalCount={15}/>
            <button className="progress__button progress__button--hint">
              <span>Подсказка</span>
              </button>
            <button className="progress__button progress__button--next-level progress__button--inactive">Следующий пример</button>
          </div>

        </div>
        <div className="game-field">
          <Level steps={[expressionP, expression1, expression]}></Level>
          {/*<Expression expression={parsedExpression} onChangeCorrectState={(isCorrect) => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", isCorrect)}/>*/}
        </div>
      </div>
    </>
  )
}