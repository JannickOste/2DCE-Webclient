import { TILESIZE } from "../Globals"
import Player from "./characters/Player"

export class Camera
{
    static offset = {
        x: 0, 
        y: 0
    }

    static ResetOffset() 
    {
        Camera.offset = {
            x: -((Player.position.x*TILESIZE)),
            y: -((Player.position.y*TILESIZE))
        }
    }
}