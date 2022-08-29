import { TILESIZE } from "../Globals";
import Tilemap from "./Tilemap";
export const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2, 
    RIGHT: 3
}

export default class Player 
{
    static characterID = 49;

    static running = false;
    static runMultiplier = 2;
    static position = { x: 5, y: 5 }
    static moveDirection = {x: 0, y: 0};
    static get Moving() { return Object.values(Player.moveDirection).some(n => n !== 0); }
    
    static Move(direction, run)
    {
        if(this.Moving) return;
        this.running = run;

        switch(direction)
        {
            case Direction.UP:    Player.moveDirection = {x: 0, y: 1}; break;
            case Direction.DOWN:  Player.moveDirection = {x: 0, y: -1};  break;
            case Direction.LEFT:  Player.moveDirection = {x: 1, y: 0};  break;
            case Direction.RIGHT: Player.moveDirection = {x: -1, y: 0}; break;
        }

        if(!Tilemap.TilePassable(Player.position.x+Player.moveDirection.x, Player.position.y+Player.moveDirection.y))
            Player.moveDirection = {x: 0, y: 0};
            
        Player.position.x += -Player.moveDirection.x;
        Player.position.y += -Player.moveDirection.y;
    }

    static Update() 
    {
        if(Player.Moving)
        {
            // todo: add clamp for speed
            Tilemap.offset.x += (Player.moveDirection.x*(Player.running ? Player.runMultiplier : 1)); 
            Tilemap.offset.y += (Player.moveDirection.y*(Player.running ? Player.runMultiplier : 1)); 

            if(Tilemap.offset.x % TILESIZE === 0 && Tilemap.offset.y % TILESIZE === 0)
                Player.moveDirection = {x: 0, y: 0}
        } 
    }

    static Render(context, spritesheet) 
    {
        context.save();
        const area = spritesheet.getTileArea(Player.characterID);
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
