import { TILESIZE } from "../../Globals";
import Tilemap from "./Tilemap";
export const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2, 
    RIGHT: 3
}

export default class Player 
{
    static position = {x: 32, y: 32}
    static get positionNormalized(){ return {x: Player.position.x/TILESIZE, y: Player.position.y/TILESIZE} }
    static facingDirection = {x: 0, y: 0};
    static speed = 1;

    static get Moving() { return Object.values(Player.facingDirection).some(n => n % TILESIZE != 0); }

    static Move(direction)
    {
        switch(direction)
        {
            case Direction.UP:    Player.facingDirection = {x: 0, y: -Player.speed}; break;
            case Direction.DOWN:  Player.facingDirection = {x: 0, y: Player.speed};  break;
            case Direction.LEFT:  Player.facingDirection = {x: -Player.speed, y: 0};  break;
            case Direction.RIGHT: Player.facingDirection = {x: Player.speed, y: 0}; break;
        }

        Player.position = {
            x: Player.position.x + Player.facingDirection.x, 
            y: Player.position.y + Player.facingDirection.y
        }
    }

    static Update() 
    {
        if(Player.Moving)
        {
            Player.position = {
                x: Player.position.x + Player.facingDirection.x, 
                y: Player.position.y + Player.facingDirection.y
            }

            Tilemap.offset = {
                x: -Player.position.x,
                y: -Player.position.y,
            }
            
            if(Player.position.x % TILESIZE === 0 && Player.position.y % TILESIZE === 0)
                Player.facingDirection = {x: 0, y: 0}
        } 
    }

    static Render(context, spritesheet) 
    {
        context.save();
        const area = spritesheet.getTileArea(49);
        const degree = 0;
        const rad = degree * Math.PI / 180;
        const x = Math.floor(((window.innerWidth/2)/TILESIZE))*TILESIZE;
        const y =  Math.floor(((window.innerHeight/2)/TILESIZE))*TILESIZE;
    
        context.translate(x, y);
        context.rotate(rad);
        context.drawImage(spritesheet._targetElement, area.x, area.y, TILESIZE, TILESIZE, 0, 0, TILESIZE, TILESIZE);
    
        context.restore();
    }
}
