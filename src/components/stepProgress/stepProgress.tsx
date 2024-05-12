import React, { useEffect, useMemo, useState } from "react";
import './stepProgress.css';

interface IStepProgressProps{
    completeCount: number,
    totalCount: number,
}

export function StepProgress({ completeCount, totalCount}: IStepProgressProps) {
    return (
        <div className="step-progress">
            <div className="step-progress-header">
                <div className="step-progress-solved">
                    Решено этапов в примере
                </div>
                <div className="step-progress-complete">
                    <div>{completeCount}</div>
                    <div>из</div>
                    <div>{totalCount}</div>
                </div>
            </div>
        </div>
    )
}