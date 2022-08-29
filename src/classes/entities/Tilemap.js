import { TILESIZE, toCsvArray } from "../Globals";
import Player from "./Player";

export const Area = (() => {
    return {
        TEST: "test"
    }
})();

export default class Tilemap 
{
    /** Area to load data for */
    static currentArea = Area.TEST;

    /** Map tiles */
    static #mapBackground = [];
    static #mapForeground = [];
    static #mapObjects = [];

    /** Render options  */
    static offset = {x: 0, y: 0}

    static TilePassable(x, y) 
    {
        return (!Tilemap.#mapObjects.some((obj) => obj.x == x && obj.y == y) 
            && (y >= 0 && y < this.#mapBackground.length)
            && (x >= 0 && x < this.#mapBackground[y].length)
            && ((y >= this.#mapForeground.length || x >= this.#mapForeground[y].length) || this.#mapForeground[y][x] === "-1")
        )
    }

    static async Update()
    {
        
        if(!Tilemap.#mapBackground.length || !Tilemap.#mapForeground.length || !Tilemap.#mapObjects.length)
        {
            Tilemap.offset = {x: -((Player.position.x*TILESIZE)), y: -((Player.position.y*TILESIZE))}
            const backgroundRequest = await fetch(`/maps/${Tilemap.currentArea}_bg.csv`);
            Tilemap.#mapBackground = toCsvArray(await backgroundRequest.text());

            const foregroundRequest = await fetch(`/maps/${Tilemap.currentArea}_fg.csv`);
            Tilemap.#mapForeground = toCsvArray(await foregroundRequest.text());

            const objectsRequest = await fetch(`/maps/${Tilemap.currentArea}_objects.json`);
            Tilemap.#mapObjects = JSON.parse(await objectsRequest.text());
        }

    }

    
    static Render(context, spritesheet)
    {
        // Center on screen, and add current map shift
        const xOffset = (Math.ceil(((window.innerWidth/2)/TILESIZE))*TILESIZE)+(Tilemap.offset.x);
        const yOffset =  (Math.ceil(((window.innerHeight/2)/TILESIZE))*TILESIZE)+(Tilemap.offset.y);

        const areaBuffer = {}
        for(let y = 0; y < Math.max(Tilemap.#mapBackground.length, Tilemap.#mapForeground.length); y++)
        {
            for(let x = 0; x < Tilemap.#mapBackground[0].length; x++)
            {
                let tiles = [
                    y < Tilemap.#mapBackground.length && x < Tilemap.#mapBackground[y].length ? Number.parseInt(Tilemap.#mapBackground[y][x]) : -1, // Backround
                    y < Tilemap.#mapForeground.length && x < Tilemap.#mapForeground[y].length ? Number.parseInt(Tilemap.#mapForeground[y][x]) : -1  // Foreground
                ]
                
                for(let tileId of tiles)
                {
                    if(tileId == -1) continue;

                    if(!Object.keys(areaBuffer).includes(tileId))
                        areaBuffer[tileId] = spritesheet.getTileArea(tileId);
                    
                    const area = areaBuffer[tileId];
                    context.drawImage(
                        spritesheet.imageElement, 
                        
                        area.x, area.y, TILESIZE, TILESIZE, 

                        xOffset+(x*TILESIZE), 
                        yOffset+(y*TILESIZE), 
                        TILESIZE, TILESIZE
                    );
                }

            }
        }
    }


}