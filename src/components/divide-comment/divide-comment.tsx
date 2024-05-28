import React from "react";
import './divide-comment.css';

interface IDivideCommentProps {
  mod: number,
  diviser: number
}

export function DivideComment({mod, diviser}: IDivideCommentProps) {
  return (
    <div className="divide-comment-wrapper">
      <div className="divide-comment hint">
      <span>41</span> на <span>63</span> не делится, остаток записываем в <span>числитель</span> 
      </div>
    </div>    
  )
}