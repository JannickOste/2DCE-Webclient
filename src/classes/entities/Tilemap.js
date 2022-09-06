import GameManager from "../GameManager";
import { TILESIZE, toCsvArray } from "../Globals";
import { Client } from "../net/Client";
import ClientPacket from "../net/ClientPacket";
import { Camera } from "./Camera";

export const Area = (() => {
    return {
        LITTLEROOT: 0
    }
})();

export default class Tilemap 
{
    /** Area to load data for */
    static #currentArea = Area.LITTLEROOT;

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

        Client.sendPacket(ClientPacket.REQUEST_MAP, {mapid: value});

    }

    static setData(background, foreground)
    {
        this.#mapBackground = toCsvArray(background);
        this.#mapForeground = foreground;
    }

    /** Map tiles */
    static #mapBackground = [];
    static #mapForeground = [];

    static get Rows() 
    {
        return Tilemap.#mapBackground.length;
    }

    static get Columns() 
    {
        return Tilemap.#mapBackground[0].length;
    }

    static TilePassable(position, offset) 
    {
        /*
        const x = position.x+offset.x;
        const y = position.y+offset.y;
        const fgObject = this.#mapForeground.find(i => i.x == x && i.y == y);

        const objectColission = (fgObject ? fgObject.passable !== undefined && fgObject.passable : true);
        */

        return true;
    }

    static TryInvokeTileEvent(position)
    {
        /*
        const objectOnTile = this.#mapObjects.find(i => i.x == position.x && i.y == position.y);
        if(objectOnTile && objectOnTile.events)
            for(let event of objectOnTile.events)
                GameManager.actionHandler.emit(event.id, ... (event.args ? event.args : []));
        */
    }
    
    static Render(context, spritesheet)
    {
        if(Tilemap.#mapBackground.length == 0 || !Client.Connected) return;

        // Center on screen, and add current map shift
        const xOffset =  (Math.ceil(((window.innerWidth/2)/TILESIZE))*TILESIZE)+(Camera.offset.x);
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

        for(let set of [Tilemap.#mapForeground])
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
    }
}