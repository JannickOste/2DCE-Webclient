import EventEmitter from "events";
import { Camera } from "./entities/Camera";
import Player from "./entities/Player";
import Tilemap, { Area } from "./entities/Tilemap";

export default class EventHandler extends EventEmitter
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
        console.log("yeleport")
        Player.position.x = args[0];
        Player.position.y = args[1];
        Camera.ResetOffset();
    }

    onChangeMap = (... args) => 
    {
        Tilemap.currentArea = Object.values(Area)[args[0]];
        console.log(args[0])
        console.log(Object.values(Area));
        console.log("Hello world");
    }
}

