import React, { useEffect, useMemo, useState } from "react";
import { Expression, ExpressionFieldDiagonal } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";


export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const [correctFields, setCorrectFields] = useState<Record<string, string>>({ diagonal1: 'empty', diagonal2: 'empty' });
  const [isCorrect, setCorrect] = useState('empty');

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

    console.log(correctFields);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectStepState?.(stepIndex, newIsCorrect);
      setCorrect(newIsCorrect);
      if (newIsCorrect == 'correct' && activeStep == stepIndex) {
        onCompleteStep(stepIndex);
      }
    }

  }, [correctFields]);

  const stepData = {
    expression: '$frac(29, 9) + $frac(31, 7)',
    messageTop: 'Делаем диагональное умножение \n знаменателя на числитель'
  }
  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up hint-slot--step3">
        {stepData.messageTop && <div className={`hint hint-up ${activeStep > stepIndex ? "hint--inactive" : ""}`}>
          {stepData.messageTop}
        </div>}
        <div className="hint-lines">
          <div className="hint-line hint-line--left"></div>
          <div className="hint-line hint-line--right"></div>
        </div>
      </div>

      <div className="step3-expression-wrapper">
        <div className="arrows-diagonal">
          <div className="arrow-diagonal arrow-diagonal--left"></div>
          <div className="arrow-diagonal arrow-diagonal--right"></div>
        </div>
        <div className="step3-diagonal-fields">
          <ExpressionFieldDiagonal name={'diagonal1'} answer={7} onChangeCorrectState={(isCorrect) => {
            setCorrectFields(last => ({ ...last, diagonal1: isCorrect }))
          }} />
          <ExpressionFieldDiagonal name={'diagonal2'} answer={9} onChangeCorrectState={(isCorrect) => {
            setCorrectFields(last => ({ ...last, diagonal2: isCorrect }))
          }} />
        </div>
        <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => { }} isPassive={false} />
      </div>
      <div className="hint-slot hint-slot--down">
      </div>

    </div>
    {(stepIndex < activeStep) && <div className="equal">=</div>} 
  </>
}