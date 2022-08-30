import GameManager from "../GameManager";
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
    static rendered = false;

    static get currentHeight() 
    {
        return Tilemap.#mapBackground.length;
    }

    static get currentWidth() 
    {
        return Tilemap.#mapBackground[0].length;
    }

    static TilePassable(position, offset) 
    {
        const x = position.x+offset.x;
        const y = position.y+offset.y;
        const mapObject = this.#mapObjects.find(i => i.x == x && i.y == y);
        const fgObject = this.#mapForeground.find(i => i.x == x && i.y == y);

        const objectColission = (mapObject ? mapObject.passable !== undefined && mapObject.passable : true) && (fgObject ? fgObject.passable !== undefined && fgObject.passable : true);
        return objectColission;
    }

    static TryInvokeTileEvent()
    {
        const objectOnTile = this.#mapObjects.find(i => i.x == Player.position.x && i.y == Player.position.y);
        if(objectOnTile && objectOnTile.event && typeof(objectOnTile.event) === "number")
        {
            GameManager.actionHandler.emit(objectOnTile.event, ... (objectOnTile.args ? objectOnTile.args : []));
        }
    }


    static async Load()
    {
        
        if(!Tilemap.#mapBackground.length || !Tilemap.#mapForeground.length || !Tilemap.#mapObjects.length)
        {
            Tilemap.ResetOffset();
            const backgroundRequest = await fetch(`/maps/${Tilemap.currentArea}_bg.csv`);
            Tilemap.#mapBackground = toCsvArray(await backgroundRequest.text());

            const foregroundRequest = await fetch(`/maps/${Tilemap.currentArea}_fg.json`);
            Tilemap.#mapForeground = JSON.parse(await foregroundRequest.text());

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
        for(let [y, set] of Object.entries(Tilemap.#mapBackground))
        {
            for(let [x, tileId] of Object.entries(set))
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

        for(let set of [Tilemap.#mapForeground, Tilemap.#mapObjects])
        {
            for(let obj of set)
            {
                if(!Object.keys(areaBuffer).includes(obj.id))
                    areaBuffer[obj.id] = spritesheet.getTileArea(obj.id);
            
                const area = areaBuffer[obj.id];
                context.drawImage(
                    spritesheet.imageElement, 
                    
                    area.x, area.y, TILESIZE, TILESIZE, 
                    xOffset+(obj.x*TILESIZE), 
                    yOffset+(obj.y*TILESIZE), 
                    TILESIZE, TILESIZE
                );
            }
        }
    }

    static ResetOffset() 
    {
        Tilemap.offset = {x: -((Player.position.x*TILESIZE)), y: -((Player.position.y*TILESIZE))}
    }
}