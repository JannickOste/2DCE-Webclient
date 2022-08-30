import EventEmitter from "events";
import Player from "./entities/Player";
import Tilemap from "./entities/Tilemap";

export default class ActionHandler extends EventEmitter
{
    #actionEventHandlers = (() =>
    {
        return {
            Teleport: 1,
            ChangeMap: 2
        }
    })();

    constructor() 
    {
        super();
        
        this.addListener(`${this.#actionEventHandlers.Teleport}`, this.onTeleportEvent);
        this.addListener(`${this.#actionEventHandlers.ChangeMap}`, this.onChangeMap);
    }
    
    onTeleportEvent = (... args) => 
    {

        Player.position.x = args[0];
        Player.position.y = args[1];
        Tilemap.ResetOffset();
    }

    onChangeMap = (... args) => 
    {

    }
}

