import React, { useState } from "react";
import { Level } from "../../components/level/level";
import { LevelProgress } from "../../components/levelProgress/levelProgress";
import { StepProgress } from "../../components/stepProgress/stepProgress";
import { Crib } from "../../components/crib/crib";
import { parseExpression } from "../../parsers";
import { Link, useParams } from "react-router-dom";
import { SuccessPopup, ErrorPopup } from "../../components/messagePopup/messagePopup";
import LevelT4 from "../../components/levels/level-T4/level-T4";
import LevelT4_1 from "../../components/levels/level-T4-1/level-T4";
import './levelPage.css';

export function LevelPage() {
  const [stepCompleteCount, setStepCompleteCount] = useState(0);
  const [totalStepsCount, setTotalStepsCount] = useState(1);
  const [isActiveHint, setIsActiveHint] = useState(false);
  const [isCompleteLevel, setIsCompleteLevel] = useState(false);
  // const levelsData: Array<{
  //   steps: Array<{expression: string, messageTop?: string, messageBottom?: string}>
  // }> = [{
    // steps: [
    //   {
    //     expression: '3 $frac(2, 9) + 4 $frac(3, 7)',
    //     messageTop: 'Переводим в неправильную дробь :',
    //   },
    //   {
    //     expression: '$frac(a@29, 9) + $frac(b@31, 7)',
    //     messageBottom: 'Находим ОЗ \n ОЗ = З*З'
    //   },
    //   {
    //     expression: '$frac(29, 9) + $frac(31, 7)',
    //     messageTop: 'Делаем диагональное умножение \n знаменателя на числитель',
    //   },
    //   {
    //     expression: '$frac(a@203, 63) + $frac(b@279, 63)',
    //     messageTop: 'Складываем'
    //   },
    //   {
    //     expression:  '$frac(a@482, 63)'
    //   },
    //   {
    //     expression:  'a@7 $frac(b@41, 63)',
    //     messageTop: 'Сократить и (или) выделить \n целую часть'
    //   }    
    // ],
   
  // }]

  const levelsStepTotal = [5, 2, 2];
  const { id } = useParams();
  const expression2 = 'a * b + c + 5 + $frac(1 + 2, 4) + d * e + f';
  //const expression = 'a * b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f';
  const expressionP = 'a@5 * $frac(b + c + 5 + $frac(1 + 2, 4 + v * x) + d * e + f , 345 + 7654 + x * $frac(1 + 2 , 4 + k * m)) + 4 + $frac(1 + 2 , 4 + k * m) + 5';
  //const expressionP = '$frac(1, 3) * $frac(2, 6)';
  const expression1 = '$frac(a@1, 3) * $frac(b@2, 6)';
  const expression = '$frac(a@6 * b@5 + c@3, 5) * $frac(d@7 * e@6 + f@1, 6)';
  const parsedExpression = parseExpression(expression);
  //console.log(parseExpression(expression));
  const levels = [
    LevelT4_1,
    LevelT4
    // <Level steps={levelsData[0].steps} onCompleteStep={(step) => {
    //   setStepCompleteCount(step - 1);
    // }} onCompleteLevel={() => {
    //   setIsCompleteLevel(true);
    // }} onChangeCorrectStepState={(step, state) => {
    //   setIsActiveHint(state == 'incorrect')
    // }}></Level>,

    // <Level steps={[expressionP, expression1, expression]} onCompleteStep={(step) => {
    //   setStepCompleteCount(step - 1);
    // }} onCompleteLevel={() => {
    //   setIsCompleteLevel(true);
    // }} onChangeCorrectStepState={(step, state) => {
    //   setIsActiveHint(state == 'incorrect')
    // }}></Level>,

    // <Level steps={[expression2, expression1, expression]} onCompleteStep={(step) => {
    //   setStepCompleteCount(step - 1);
    // }} onCompleteLevel={() => {
    //   setIsCompleteLevel(true);
    // }} onChangeCorrectStepState={(step, state) => {
    //   setIsActiveHint(state == 'incorrect')
    // }}></Level>
  ]
  const CurrentLevel = levels[Number(id)];
  const currentLevelElement = <CurrentLevel onCompleteStep={(step, totalSteps) => {
      setStepCompleteCount(step - 1);
      setTotalStepsCount(totalSteps);
    }} onCompleteLevel={() => {
      setIsCompleteLevel(true);
    }} onChangeCorrectStepState={(step, state) => {
      setIsActiveHint(state == 'incorrect')
    }}></CurrentLevel>;

  return (
    <>
      <div className="app__wrapper">
        <div className="status-bar">
          <div className="status-bar__path-wrapper">
            <div className="level-path">
              <p className="level-path__item">
                <Link to="/">Тренажер</Link> / Арифметические действия с обыкновенными дробями. </p>
              <p className="level-path__item">Умножение.</p>
            </div>
          </div>
          <div className="status-bar__progress progress">
            <LevelProgress completeCount={0} totalCount={15} />
            <StepProgress completeCount={stepCompleteCount} totalCount={totalStepsCount - 1} />
            <button className={`progress__button progress__button--hint ${isActiveHint ? "progress__button--hint-active" : ""}`}>
              <span>Подсказка</span>
            </button>
            <button className={`progress__button progress__button--next-level ${isCompleteLevel ? "" : "progress__button--inactive" }`}>
              <span>Следующий пример</span>
            </button>
          </div>
        </div>
        <div className="game-field">
          {currentLevelElement}
          {/*<Expression expression={parsedExpression} onChangeCorrectState={(isCorrect) => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", isCorrect)}/>*/}
          {isCompleteLevel && <SuccessPopup />}
          {isActiveHint && <ErrorPopup />}
          
        </div>
        
      </div>
    </>
  )
}