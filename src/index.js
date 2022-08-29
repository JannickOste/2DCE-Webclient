import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Spritesheet from "./components/gfx/Spritesheet"
import GameManager from './classes/GameManager';
import Player, { Direction } from './classes/entities/Player';
import Canvas from './components/canvas/Canvas';
import InputHandler from './classes/io/InputHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
const spritesheet = new Image();
spritesheet.onload = () => root.render(<Canvas draw={GameManager.Render} spritesheet={new Spritesheet(spritesheet, 32)}/>);
spritesheet.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/413d31d1-b0ae-49f9-a39c-e5b8bcca59f4/d69io1m-4c51e4c1-9e5e-489c-a256-1e73cb61daf4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80MTNkMzFkMS1iMGFlLTQ5ZjktYTM5Yy1lNWI4YmNjYTU5ZjQvZDY5aW8xbS00YzUxZTRjMS05ZTVlLTQ4OWMtYTI1Ni0xZTczY2I2MWRhZjQucG5nIn1dXX0.nbM39ox8QihGv5Mag4D1aPYCYMBVhE5XnS7FyotK05g';

document.addEventListener("keypress", (ev) => {
  if(Player.Moving) return;
  /** Key event handlers */
  switch(ev.key)
  {
    case InputHandler.KeyMapping.UP: Player.Move(Direction.UP); break;
    case InputHandler.KeyMapping.DOWN: Player.Move(Direction.DOWN); break;
    case InputHandler.KeyMapping.LEFT: Player.Move(Direction.LEFT); break;
    case InputHandler.KeyMapping.RIGHT: Player.Move(Direction.RIGHT); break;
  }
});
setInterval(GameManager.Update)

reportWebVitals();
