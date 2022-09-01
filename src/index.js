import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Spritesheet from "./classes/gfx/Spritesheet"
import GameManager from './classes/GameManager';
import Canvas from './components/Canvas';
import InputHandler from './classes/io/InputHandler';
import { MS_PER_TICK } from './classes/Globals';

(async() => 
{
  window.addEventListener("beforeunload", GameManager.Exit);
  await GameManager.Load();
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Canvas renderer={GameManager.Render} spritesheet={await Spritesheet.parseFromURL("/spritesheet.png")}/>);

  document.addEventListener("keypress", InputHandler.HandleKeyPress);
  setInterval(GameManager.Update, MS_PER_TICK);
})();


reportWebVitals();
