import { SendInput } from "../net/packets/client/SendInput";


export const NativeInputCode = (() => {
    return {
        MOVE_UP:     0,
        MOVE_DOWN:   1,
        MOVE_LEFT:   2,
        MOVE_RIGHT:  3,

        ACTION:      4,
        INGAME_MENU: 5
    }
});

export default class InputHandler
{
    static inputOveride;


    static KeyBindings = {
        z: NativeInputCode.MOVE_UP,
        s: NativeInputCode.MOVE_DOWN,
        q: NativeInputCode.MOVE_LEFT,
        d: NativeInputCode.MOVE_RIGHT,
        /*
        w: NativeInputCode.MOVE_UP,
        a: NativeInputCode.MOVE_LEFT,
        s: NativeInputCode.MOVE_DOWN,
        d: NativeInputCode.MOVE_RIGHT,
        */
        a: NativeInputCode.ACTION
    }

    static KeyMapping = (() =>{
        return { 
            UP: "z",
            DOWN: "s",
            LEFT: "q",
            RIGHT: "d",
            ACTION: "a"
        }
    })();
    
    static HandleKeyPress = (ev) => 
    {
        const shiftClick = new RegExp(/^[A-Z]$/).test(ev.key);
        const key = ev.key.toLowerCase();
        /** Key event handlers */
        if(!InputHandler.inputOveride)
        {
            switch(ev.key.toLowerCase())
            {
                case InputHandler.KeyMapping.UP:    SendInput(0, -1, shiftClick); break;// OldPlayer.Move(Direction.UP,    shiftClick);  break;
                case InputHandler.KeyMapping.DOWN:  SendInput(0,  1, shiftClick);  break;
                case InputHandler.KeyMapping.LEFT:  SendInput(-1, 0, shiftClick); break;
                case InputHandler.KeyMapping.RIGHT: SendInput(1,  0, shiftClick);  break;
                default: return;
            }
        }
        else 
        {
            const direction = Object.entries(this.KeyMapping).find(i => i[1] === key);
            InputHandler.inputOveride(direction[0]);
        }
    }
}