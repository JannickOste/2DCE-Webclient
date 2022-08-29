import Player, { Direction } from "../entities/Player";
import EventEmitter from "events";

export default class InputHandler extends EventEmitter
{
    constructor()
    {
        super();
        this.addListener("OnUpPress",     this.OnUpPress);
        this.addListener("OnDownPress",   this.OnDownPress);
        this.addListener("OnLeftPress",   this.OnLeftPress);
        this.addListener("OnRightPress",  this.OnRightPress);
    }

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
        console.log(ev);
        if(Player.Moving) return;
        /** Key event handlers */
        switch(ev.key)
        {
          case InputHandler.KeyMapping.UP: Player.Move(Direction.UP); break;
          case InputHandler.KeyMapping.DOWN: Player.Move(Direction.DOWN); break;
          case InputHandler.KeyMapping.LEFT: Player.Move(Direction.LEFT); break;
          case InputHandler.KeyMapping.RIGHT: Player.Move(Direction.RIGHT); break;
        }
    }

    /** Key event handlers */
    OnUpPress = () => Player.Move(Direction.UP);
    OnDownPress = () => Player.Move(Direction.DOWN);
    OnLeftPress = () => Player.Move(Direction.LEFT);
    OnRightPress = () => Player.Move(Direction.RIGHT);
}