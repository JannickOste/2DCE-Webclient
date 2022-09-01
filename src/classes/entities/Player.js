import { TILESIZE } from "../Globals";
import Tilemap from "./Tilemap";
export const Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

export default class Player 
{
    static characterID = 810;

    static #running = false;
    static #runMultiplier = 2;
    static #moveDirection = {x: 0, y: 0};
    static #facingDirection = Direction.DOWN;
    
    static position = { x: 5, y: 5 }
    
    static get Moving() { return Object.values(Player.#moveDirection).some(n => n !== 0); }
    
    static Move(direction, run)
    {
        if(this.Moving) return;
        Player.#facingDirection = direction;
        this.#running = run;

        switch(direction)
        {
            case Direction.UP:    if(Player.position.y > 0) Player.#moveDirection = {x: 0, y: -1}; break;
            case Direction.DOWN:  if(Player.position.y < Tilemap.currentHeight-2) Player.#moveDirection = {x: 0, y: 1};  break; //Todo: look into why render is -1 additional row.
            case Direction.RIGHT: if(Player.position.x < Tilemap.currentWidth-1) Player.#moveDirection = {x: 1, y: 0}; break;
            case Direction.LEFT:  if(Player.position.x > 0) Player.#moveDirection = {x: -1, y: 0};  break;

            default: throw new Error("Invalid direction parameter, use the Direction enum for passing in direction values.");
        }

        if((Player.#moveDirection.x !== 0 || Player.#moveDirection.y !== 0) && Tilemap.TilePassable(Player.position, Player.#moveDirection))
        {
            Player.position.x += Player.#moveDirection.x;
            Player.position.y += Player.#moveDirection.y;
        } else Player.#moveDirection = {x: 0, y: 0}
    }

    static Update() 
    {
        if(Player.Moving)
        {
            // todo: add clamp for speed
            Tilemap.offset.x += -(Player.#moveDirection.x*(Player.#running ? Player.#runMultiplier : 1)); 
            Tilemap.offset.y += -(Player.#moveDirection.y*(Player.#running ? Player.#runMultiplier : 1)); 

            if(Tilemap.offset.x % TILESIZE === 0 && Tilemap.offset.y % TILESIZE === 0)
            {
                Player.#moveDirection = {x: 0, y: 0}
                Tilemap.TryInvokeTileEvent();
            }
        } 
    }

    static Render(context, spritesheet) 
    {
        context.restore();
        context.save();

        const area = spritesheet.getTileArea(Player.characterID);

        const degree = [0, 1, 2, 3].map(i => -180+(i*90))[Player.#facingDirection];
        const rad = degree * Math.PI / 180;
        const x = ((Math.ceil(((window.innerWidth/2)/TILESIZE))+([Direction.UP, Direction.LEFT].includes(Player.#facingDirection)   ? 1 : 0)))*TILESIZE;
        const y =  (Math.ceil((window.innerHeight/2)/TILESIZE)+([Direction.UP, Direction.RIGHT].includes(Player.#facingDirection) ? 1 : 0))*TILESIZE; // Todo: fix this, dirty solution
    
        context.translate(x, y);
        context.rotate(rad);
        context.drawImage(spritesheet.imageElement, area.x, area.y, TILESIZE, TILESIZE, 0, 0, TILESIZE, TILESIZE);
    
        context.restore();
    }
}
