import React, { useEffect, useMemo, useState } from "react";
import './levelProgress.css';

interface ILevelProgressProps{
    completeCount: number,
    totalCount: number,
}

export function LevelProgress({ completeCount, totalCount}: ILevelProgressProps) {
    return (
        <div className="level-progress">
            <div className="level-progress-header">
                <div className="level-progress-solved">
                    Решено примеров
                </div>
                <div className="level-progress-complete">
                    <div>{completeCount}</div>
                    <div>из</div>
                    <div>{totalCount}</div>
                </div>
            </div>
            <div className="level-progress-status">
                <div className="level-progress-bar">
                </div>
            </div>
        </div>
    )
}