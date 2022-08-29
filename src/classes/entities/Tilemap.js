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
    static currentBackground = [];
    static currentForeground = [];
    
    static currentOverlay = [];

    static drawGrid = false;
    static offset = {x: 0, y: 0}

    // todo: add tile based shift.
    static RenderGrid(context)
    {
        for(let y = 0; y <  window.innerHeight/TILESIZE; y++)
          for(let x = 0; x <  window.innerWidth/TILESIZE; x++)
            context.strokeRect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE)
    }

    static TilePassable(x, y) 
    {
        console.log(x, y)
        return (!Tilemap.currentOverlay.some((obj) => obj.x == x && obj.y == y) 
            && (y >= 0 && y < this.currentBackground.length)
            && (x >= 0 && x < this.currentBackground[y].length)
            && ((y >= this.currentForeground.length || x >= this.currentForeground[y].length) || this.currentForeground[y][x] === "-1")
        )
    }

    static async Update()
    {
        
        if(!Tilemap.currentBackground.length)
        {
            Tilemap.offset = {x: -((Player.position.x*TILESIZE)), y: -((Player.position.y*TILESIZE))}
            const mapData = await fetch(`/maps/${Tilemap.currentArea}_bg.csv`);
            Tilemap.currentBackground = (await mapData.text()).split("\n").map(s => s.split(";"));
        }

        if(!Tilemap.currentForeground.length)
        {
            const mapData = await fetch(`/maps/${Tilemap.currentArea}_fg.csv`);
            Tilemap.currentForeground = (await mapData.text()).split("\n").map(s => s.split(";"));
        }

        if(!Tilemap.currentOverlay.length)
        {
            const mapData = await fetch(`/maps/${Tilemap.currentArea}_objects.json`);

            Tilemap.currentOverlay = JSON.parse(await mapData.text());
        }
    }

    
    static Render(context, spritesheet)
    {
        // Center on screen, and add current map shift
        const xOffset = (Math.ceil(((window.innerWidth/2)/TILESIZE))*TILESIZE)+(Tilemap.offset.x);
        const yOffset =  (Math.ceil(((window.innerHeight/2)/TILESIZE))*TILESIZE)+(Tilemap.offset.y);

        for(let layer of [Tilemap.currentBackground, Tilemap.currentForeground])
        {
            if(!layer.length) continue;
            console.log(layer)
            for(let [y, set] of Object.entries(layer))
            {
                for(let [x, tileId] of Object.entries(set))
                {
                    if(tileId === "-1") continue;

                    const area = spritesheet.getTileArea(tileId);

                    context.drawImage(
                        spritesheet._targetElement, 
                        
                        area.x, area.y, TILESIZE, TILESIZE, 

                        xOffset+(x*TILESIZE), 
                        yOffset+(y*TILESIZE), 
                        TILESIZE, TILESIZE
                    );
                }
            }

        }

        if(Tilemap.drawGrid) Tilemap.RenderGrid(context);
    }


}