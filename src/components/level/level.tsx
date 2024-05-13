import React, { useEffect, useMemo, useState } from "react";
import './level.css';
import { parseExpression } from "../../parsers";
import { Expression } from "../steps/expression/expression";

interface ILevelProps{
    steps: Array<string>;
    onCompleteStep: (step: number) => void;
    onCompleteLevel: () => void;
    onChangeCorrectStepState: (step: number, state: string) => void;
}

export function Level({ steps, onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
    const parsedSteps = steps.map(it=>parseExpression(it));
    const [activeStep, setActiveStep] = useState(1);
    return (
      <div className="level">
        <div>
            active step {activeStep-1} / {steps.length-1}
        </div>
        <div className="full-expression">
            {
                parsedSteps.slice(0, activeStep+1).map((it, index)=>{
                    if (index>parsedSteps.length){
                        return <div>completed</div>
                    }
                    return <>
                        <div className="step">
                            <div className="hint-slot">
                                <div className="hint hint-up">
                                Переводим в неправильную дробь :
                                </div>
                            </div>
                            
                            <Expression expression={it} onChangeCorrectState={(isCorrect) => {
                               onChangeCorrectStepState(activeStep, isCorrect);
                                if(isCorrect == 'correct') {
                                    const nextStep = Math.max(index+1, activeStep);
                                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", isCorrect);
                                    setActiveStep(last=> Math.max(index+1, last));
                                    onCompleteStep(nextStep);
                                    if(nextStep == steps.length-1) {
                                        onCompleteLevel();
                                    }
                                }
                               
                            }} isPassive={index == 0}/>
                            <div className="hint-slot">
                                <div className="hint hint-down">
                                    и вот то
                                </div>
                            </div>
                            
                        </div>
                        {index<activeStep && <div className="equal">=</div>}
                    </>
                })
            }
        </div>
      </div>
    )
};