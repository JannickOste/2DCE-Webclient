import { TILESIZE } from "../../Globals";

const MapLocation = (() =>
{
    return {

        TEST: 0
    }
})();

export default class Tilemap 
{
    static currentLocation = MapLocation.TEST;

    static currentMap = []
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

        if(Tilemap.drawGrid) Tilemap.RenderGrid(context);
    }

    // todo: add tile based shift.
    static RenderGrid(context)
    {
        for(let y = 0; y <  window.innerHeight/TILESIZE; y++)
          for(let x = 0; x <  window.innerWidth/TILESIZE; x++)
            context.strokeRect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE)
    }

    static async Update()
    {
        if(Tilemap.currentMap.length === 0)
        {
            const mapData = await fetch("/maps/test.csv");
            Tilemap.currentMap = (await mapData.text()).split("\n").map(s => s.split(";"));
        }
    }
}