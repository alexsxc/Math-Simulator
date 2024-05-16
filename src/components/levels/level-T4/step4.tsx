import React, { useEffect, useMemo, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";


export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression: '$frac(a@203, 63) + $frac(b@279, 63)',
    messageTop: 'Складываем'
  }
  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up hint-slot--step4"> 
      {stepData.messageTop && <div className={`hint hint-up ${activeStep > stepIndex ? "hint--inactive" : ""}`}>
          {stepData.messageTop}
        </div>}    
      </div>

      <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
        console.log(stepIndex, activeStep);
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