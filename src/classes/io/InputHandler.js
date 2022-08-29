import Player, { Direction } from "../entities/Player";

export default class InputHandler
{
    static KeyMapping = (() =>{
        return { 
            UP: "z",
            DOWN: "s",
            LEFT: "q",
            RIGHT: "d"
        }
    })();
    
    static HandleKeyPress = (ev) => 
    {
        if(Player.Moving) return;

        const shiftClick = new RegExp(/^[A-Z]$/).test(ev.key);
        /** Key event handlers */
        switch(ev.key.toLowerCase())
        {
          case InputHandler.KeyMapping.UP:    Player.Move(Direction.UP,    shiftClick);  break;
          case InputHandler.KeyMapping.DOWN:  Player.Move(Direction.DOWN,  shiftClick);  break;
          case InputHandler.KeyMapping.LEFT:  Player.Move(Direction.LEFT,  shiftClick);  break;
          case InputHandler.KeyMapping.RIGHT: Player.Move(Direction.RIGHT, shiftClick);  break;
        }
    }
}