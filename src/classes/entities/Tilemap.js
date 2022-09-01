import GameManager from "../GameManager";
import { TILESIZE, toCsvArray } from "../Globals";
import { Camera } from "./Camera";
import Player from "./Player";

export const Area = (() => {
    return {
        TEST:        "test",
        ATTACK_SHOP: "attshop"
    }
})();

export default class Tilemap 
{
    /** Area to load data for */
    static #currentArea = Area.TEST;
    static get currentArea()
    {
        return this.#currentArea;
    }

    static set currentArea(value)
    {
        if(!Object.values(Area).includes(value))
            throw new Error("Invalid area");

        Tilemap.#Flush();
        this.#currentArea = value;

        // Update tilemap assets
        GameManager.asyncUpdateQueue.push(async() => {
            Camera.ResetOffset();
            
            const backgroundRequest = await fetch(`/maps/${Tilemap.#currentArea}_bg.csv`);
            if(backgroundRequest.status == 200) Tilemap.#mapBackground = toCsvArray(await backgroundRequest.text());
            else console.log("No background tiles found for: "+this.#currentArea);

            const foregroundRequest = await fetch(`/maps/${Tilemap.#currentArea}_fg.json`);
            if(foregroundRequest.status == 200) Tilemap.#mapForeground = JSON.parse(await foregroundRequest.text());
            else console.log("No foreground tiles found for: "+this.#currentArea);
            
            const objectsRequest = await fetch(`/maps/${Tilemap.#currentArea}_objects.json`);
            console.dir(objectsRequest);
            if(objectsRequest.status == 200) Tilemap.#mapObjects = JSON.parse(await objectsRequest.text());
            else console.log("No interactable object tiles found for: "+this.#currentArea);
        });
    }

    /** Map tiles */
    static #mapBackground = [];
    static #mapForeground = [];
    static #mapObjects = [];

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

    static TryInvokeTileEvent(position)
    {
        const objectOnTile = this.#mapObjects.find(i => i.x == position.x && i.y == position.y);
        if(objectOnTile && objectOnTile.events)
            for(let event of objectOnTile.events)
                GameManager.actionHandler.emit(event.id, ... (event.args ? event.args : []));
    }
    
    static Render(context, spritesheet)
    {
        if(!GameManager.running) return;
        // Center on screen, and add current map shift
        const xOffset = (Math.ceil(((window.innerWidth/2)/TILESIZE))*TILESIZE)+(Camera.offset.x);
        const yOffset =  (Math.ceil(((window.innerHeight/2)/TILESIZE))*TILESIZE)+(Camera.offset.y);

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

    static #Flush() 
    {
        Tilemap.#mapBackground = [];
        Tilemap.#mapForeground = [];
        Tilemap.#mapObjects = [];
    }
}