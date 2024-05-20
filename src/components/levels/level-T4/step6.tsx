import React, { useEffect, useMemo, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { findField, parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, draftState, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression:  'a@7 $frac(b@41, 63)',
    messageTop: 'Сократить и (или) выделить \n целую часть'
  }
  const [expression, setExpression] = useState(parseExpression(stepData.expression));

  useEffect(() => {
    console.log(draftState);
    if(draftState.step6_1 != undefined) {
      setExpression(last => {
        const nextState = JSON.parse(JSON.stringify(last));
        const fieldData = findField(nextState, 'a');
        fieldData.value.initialValue = draftState.step6_1;
        return nextState;
      })
    } 

    if(draftState.step6_2 != undefined) {
      setExpression(last => {
        const nextState = JSON.parse(JSON.stringify(last));
        const fieldData = findField(nextState, 'b');
        fieldData.value.initialValue = draftState.step6_2;
        return nextState;
      })
    } 
  }, [draftState]);

  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up hint-slot--step6">
      {stepData.messageTop && <div className={`hint hint-up ${activeStep > stepIndex ? "hint--inactive" : ""}`}>
          {stepData.messageTop}
        </div>}
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
  </>
}