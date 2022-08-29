import { TILESIZE } from "../Globals";
import Player from "./Player";

export const Area = (() => {
    return {
        TEST: "test"
    }
})();

export default class Tilemap 
{
    static currentArea = Area.TEST;
    static currentMap = []
    static currentOverlay = [];

    static drawGrid = false;
    static offset = {x: 0, y: 0}

    static Render(context, spritesheet)
    {
        const xOffset = Math.floor(((window.innerWidth/2)/TILESIZE))*TILESIZE;
        const yOffset =  Math.floor(((window.innerHeight/2)/TILESIZE))*TILESIZE;

        for(let [y, set] of Object.entries(Tilemap.currentMap))
        {
            for(let [x, tileId] of Object.entries(set))
            {
                const area = spritesheet.getTileArea(tileId);

                context.drawImage(
                    spritesheet._targetElement, 
                    
                    area.x, area.y, TILESIZE, TILESIZE, 

                    xOffset+((x*TILESIZE)+(Tilemap.offset.x)), 
                    yOffset+((y*TILESIZE)+(Tilemap.offset.y)), 
                    TILESIZE, TILESIZE
                );
            }
        }

        for(let obj of Tilemap.currentOverlay)
        {
            const area = spritesheet.getTileArea(obj.id);
            context.drawImage(
                spritesheet._targetElement,
                area.x, area.y, TILESIZE, TILESIZE, 
                xOffset+((obj.x*TILESIZE)+(Tilemap.offset.x)), 
                yOffset+((obj.y*TILESIZE)+(Tilemap.offset.y)), 
                TILESIZE, TILESIZE
            )
        }
    

        if(Tilemap.drawGrid) Tilemap.RenderGrid(context);
    }


    // todo: add tile based shift.
    static RenderGrid(context)
    {
        for(let y = 0; y <  window.innerHeight/TILESIZE; y++)
          for(let x = 0; x <  window.innerWidth/TILESIZE; x++)
            context.strokeRect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE)
    }

    static TilePassable(x, y) 
    {
        return !Tilemap.currentOverlay.some((obj) => obj.x == x && obj.y == y);
    }

    static async Update()
    {

        if(Tilemap.currentOverlay.length === 0)
        {
            const mapData = await fetch(`/maps/${Tilemap.currentArea}Overlay.json`);

            Tilemap.currentOverlay = JSON.parse(await mapData.text());
        }
        
        if(Tilemap.currentMap.length === 0)
        {
            Tilemap.offset = {x: -((Player.position.x*TILESIZE)), y: -((Player.position.y*TILESIZE))}
            const mapData = await fetch(`/maps/${Tilemap.currentArea}.csv`);
            Tilemap.currentMap = (await mapData.text()).split("\n").map(s => s.split(";"));
        }
    }
}