import React, { useEffect, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { findField, parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, draftState, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression: '$frac(a@482, 63)'
  }
  const [expression, setExpression] = useState(parseExpression(stepData.expression));

  useEffect(() => {
    if(draftState.step5 != undefined) {
      setExpression(last => {
        const nextState = JSON.parse(JSON.stringify(last));
        const fieldData = findField(nextState, 'a');
        fieldData.value.initialValue = draftState.step5;
        return nextState;
      })
    } 
  }, [draftState]);

  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up">
      </div>

      <Expression expression={expression} onChangeCorrectState={(isCorrect) => {
        onChangeCorrectStepState(stepIndex, isCorrect);
        if (isCorrect == 'correct' && activeStep == stepIndex) {
          onCompleteStep(stepIndex);
        }

      }} isPassive={false} />
      <div className="hint-slot hint-slot--down">
      </div>

    </div>
    {(stepIndex < activeStep) && <div className="equal">=</div>} 
  </>
}