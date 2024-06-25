import React, { useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";
import Group from './Group12.svg';

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression: '2 $comma(,) 2 $comma(,) 9 $comma(,) 5',
    messageTop: '',
    messageBottom: ''
  };
  
  return (
    <>
      {activeStep <= stepIndex + 3 && (
        <>
          <div className="step">
            <div className="hint-slot hint-slot--up hint-slot--step0">
            </div>
            
            <div className="expression-wrapper ">
                <div className="expression-number">
                2
                </div>
                <img className="expression-comma" src={Group} alt="" />
                <div className="expression-number">
                  7</div>
                <div className="expression-sign">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8.88013" cy="8" r="8" fill="black"/>
</svg></div>
                <div className="expression-number">
                  0</div>
                  <img className="expression-comma" src={Group} alt="" />
                <div className="expression-number">8</div>
                <div className="expression-number">5</div>
              </div>
            <div className="hint-slot hint-slot--down">
            {stepData.messageBottom && <div className={`hint hint-down ${(activeStep <= stepIndex +2 ) ? "hint--inactive" : ""}`}>
            {stepData.messageBottom}
        </div>}
            </div>
          </div>
          {stepIndex < activeStep && <div className="equal">=</div>}
        </>
      )}
    </>
  );
}