import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Spritesheet from "./classes/gfx/Spritesheet"
import GameManager from './classes/GameManager';
import Canvas from './components/Canvas';
import InputHandler from './classes/io/InputHandler';

const spritesheet = new Image();
spritesheet.src = '/spritesheet.png';
spritesheet.onload = () => {
  setInterval(GameManager.Update);
  document.addEventListener("keypress", InputHandler.HandleKeyPress);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Canvas draw={GameManager.Render} spritesheet={new Spritesheet(spritesheet, 32)}/>);
}


reportWebVitals();
