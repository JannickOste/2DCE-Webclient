import { TILESIZE } from "../Globals"
import Player from "./characters/Player"

export class Camera
{
    static offset = {
        x: 0, 
        y: 0
    }

    static SetToPosition(position) 
    {
        if(Player.Local !== undefined)
            Camera.offset = {
                x: -((position.x*TILESIZE)),
                y: -((position.y*TILESIZE))
            }
    }
}