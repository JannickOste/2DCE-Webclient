import GameManager from "../GameManager";
import { SCALED_TILESIZE, TILESIZE, toCsvArray } from "../Globals";
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


    static Render(context, spritesheet)
    {
        if(Tilemap.#mapBackground.length == 0 || !Client.Connected) return;

        // Center on screen, and add current map shift
        const xOffset =  (Math.ceil(((window.innerWidth/2)/SCALED_TILESIZE))*SCALED_TILESIZE)+(Camera.offset.x);
        const yOffset =  (Math.ceil(((window.innerHeight/2)/SCALED_TILESIZE))*SCALED_TILESIZE)+(Camera.offset.y);

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
                    
                    xOffset+(x*SCALED_TILESIZE), 
                    yOffset+(y*SCALED_TILESIZE), 
                    SCALED_TILESIZE, SCALED_TILESIZE
                );
            }
        }

        for(let set of Tilemap.#mapForeground)
        {
            for(let obj of set)
            {
                if(!Object.keys(areaBuffer).includes(obj.id))
                    areaBuffer[obj.id] = spritesheet.getTileArea(obj.id);
            
                const area = areaBuffer[obj.id];
                context.drawImage(
                    spritesheet.imageElement, 
                    
                    area.x, area.y, TILESIZE, TILESIZE, 

                    xOffset+(obj.x*SCALED_TILESIZE), 
                    yOffset+(obj.y*SCALED_TILESIZE), 
                    SCALED_TILESIZE, SCALED_TILESIZE
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