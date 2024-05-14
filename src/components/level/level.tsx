import React, { useEffect, useMemo, useState } from "react";
import './level.css';
import { parseExpression } from "../../parsers";
import { Expression } from "../steps/expression/expression";
import { DraftSumm } from "../steps/draft/draft";
import { DraftPopup } from "../draftPopup/draftPopup";

interface ILevelProps {
    steps: Array<{ expression: string, messageTop?: string, messageBottom?: string }>;
    onCompleteStep: (step: number) => void;
    onCompleteLevel: () => void;
    onChangeCorrectStepState: (step: number, state: string) => void;
}

export function Level({ steps, onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
    const parsedSteps = steps.map(it => parseExpression(it.expression));
    const [activeStep, setActiveStep] = useState(1);
    const [isOpenDraft, setIsOpenDraft] = useState(false);
    return (
        <div className="level">
            <div>
                active step {activeStep - 1} / {steps.length - 1}
            </div>
            <div className="full-expression">
                {
                    parsedSteps.slice(0, activeStep + 1).map((it, index) => {
                        if (index > parsedSteps.length) {
                            return <div>completed</div>
                        }
                        return <>
                            <div className="step">
                                <div className="hint-slot hint-slot--up">
                                    {steps[index].messageTop && <div className="hint hint-up">
                                        {steps[index].messageTop}
                                    </div>}

                                </div>

                                <Expression expression={it} onChangeCorrectState={(isCorrect) => {
                                    onChangeCorrectStepState(activeStep, isCorrect);
                                    if (isCorrect == 'correct') {
                                        const nextStep = Math.max(index + 1, activeStep);
                                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", isCorrect);
                                        setActiveStep(last => Math.max(index + 1, last));
                                        onCompleteStep(nextStep);
                                        if (nextStep == steps.length) {
                                            onCompleteLevel();
                                        }
                                    }

                                }} isPassive={index == 0} />
                                <div className="hint-slot hint-slot--down">
                                    {steps[index].messageBottom && <div className="hint hint-down">
                                        {steps[index].messageBottom}
                                    </div>}
                                </div>

                            </div>
                            {index < activeStep && <div className="equal">=</div>}
                        </>
                    })
                }
            </div>
            <button type="button" className="open-draft-button" onClick={() => {
                setIsOpenDraft(true);
            }}>Черновик</button>
            {isOpenDraft && <DraftPopup onClose={() => {
                setIsOpenDraft(false)
            }}>
                <DraftSumm inputValues={[1545, 25, 930]} />
                <DraftSumm inputValues={[2547, 25, 920]} />
            </DraftPopup>}
        </div>
    )
};