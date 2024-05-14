import React, { useEffect, useMemo, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";


export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
      expression: '$frac(a@29, 9) + $frac(b@31, 7)',
      messageBottom: 'Находим ОЗ \n ОЗ = З*З'
  }
  return <>
    <div className="step">
      <div className="hint-slot hint-slot--up">
      </div>

      <Expression expression={parseExpression(stepData.expression)} onChangeCorrectState={(isCorrect) => {
        console.log(stepIndex, activeStep);
        onChangeCorrectStepState(stepIndex, isCorrect);
        if (isCorrect == 'correct' && activeStep == stepIndex + 1) {
          onCompleteStep(stepIndex);
        }

      }} isPassive={false} />
      <div className="hint-slot hint-slot--down">
        {stepData.messageBottom && <div className="hint hint-down">
          {stepData.messageBottom}
        </div>}
      </div>

    </div>
    {/* {index < activeStep && <div className="equal">=</div>} */}
  </>
  // })
}