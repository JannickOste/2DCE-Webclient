import { TILESIZE } from "../Globals";

export default class Spritesheet 
{

    _targetElement;

    constructor(spritesheet)
    {
        
        this._targetElement = spritesheet;
    }

    get width() 
    {
        return this._targetElement.width;
    }

    get height() 
    {
        return this._targetElement.height;
    }

    get imageElement() 
    {
        return this._targetElement;
    }

    get tileCount() 
    {
        return (this.width/TILESIZE)*(this.height/TILESIZE);
    }

    getTileArea(tileId)
    {
        const tiles = [this._targetElement.width/TILESIZE, this._targetElement.height/TILESIZE];
            
        const row = Math.floor(tileId/tiles[0]);
        const column = (tileId-(row*tiles[0]))-1;

        var sourceX = column*TILESIZE;
        var sourceY = row*TILESIZE;

        return  {
            x: sourceX, 
            y: sourceY
        };
    }
}