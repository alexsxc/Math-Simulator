import React from "react";
import './style.css';
import { Expression } from './components/steps/expression/expression';


function parseExpression(expression:string) {
  let currentLine: string = '';
  let currentType: string = '';
  const result: Array<string> = [];

  expression.split('').forEach(it => {
    
    if(currentType == 'func') {
      currentLine += it;  
      if (/^[)]$/.test(it)) {
        currentType = '';
        result.push(currentLine);
        currentLine = '';  
      }
    } else 
    if(/^-?[0-9]*$/.test(it) ) {      
      if(currentType == '') {
        
      } else if (currentType == 'number') {

      } else {
        result.push(currentLine);
        currentLine = '';
      }
      currentType = 'number';
      currentLine += it;    

    } else if (/^[-+*/]$/.test(it)) {
      if(currentType == '') {
        
      } else if (currentType == 'sign') {

      } else {
        result.push(currentLine);
        currentLine = '';
      }
      currentType = 'sign';
      currentLine += it;  

    } else if (/^[a-zA-Z]*$/.test(it)) {
      if(currentType == '') {
        
      } else if (currentType == 'field') {

      } else {
        result.push(currentLine);
        currentLine = '';
      }
      currentType = 'field';
      currentLine += it;  

    } else if (/^[$]$/.test(it)) {
      currentType = 'func';
      currentLine += it;  

    } else {
      currentType = '';
      if(currentLine) {
        result.push(currentLine);
      }     
      currentLine = '';
    }
  })
  return result;
}

export default function App() {
  const expression = 'a * b + c + 5 + $frac(1 + 2, 4) + d * e + f';
  console.log(parseExpression(expression));
  return (
    <>
    <header>
      <div className="logo">
        <img src="" alt="" />
        <p>Математический тренажер</p>
      </div>
    </header>
    <div className="wrapper">
      <div className="status-bar">
        <div className="level-path">Тренажер / Арифметические действия с обыкновенными дробями. Умножение.</div>
        <div className="level-progress"></div>
        <div className="step"></div>
        <button className="next-level"></button>
      </div>
      <div className="game-field">
        <Expression expression={expression}/>
      </div>
    </div>
    </>
  )
}