import React from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
      expression: '$frac($bracket(a@3@ЦЧ * b@9@З) + c@2@Ч, 9) + $frac($bracket(d@4@ЦЧ * e@7@З) + f@3@Ч, 7)',
  }
  return <>
    {activeStep <= stepIndex + 1 && 
    <>
    <div className="step">
      <div className="hint-slot hint-slot--up">
      </div>

      <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
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
  </>
}