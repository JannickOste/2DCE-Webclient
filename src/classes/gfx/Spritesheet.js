import { TILESIZE } from "../Globals";

export default class Spritesheet 
{

    #targetElement;

    constructor(spritesheet)
    {
        this.#targetElement = spritesheet;
    }

    static parseFromURL(src)
    {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(new Spritesheet(image, 32));
            }
            image.onerror = (e) => reject(e);

            image.src = src;
        });
    }

    get width() 
    {
        return this.#targetElement.width;
    }

    get height() 
    {
        return this.#targetElement.height;
    }

    get imageElement() 
    {
        return this.#targetElement;
    }

    get tileCount() 
    {
        return (this.width/TILESIZE)*(this.height/TILESIZE);
    }

    getTileArea(tileId)
    {
        if(tileId > this.tileCount) throw new Error(`Tile id #${tileId} out of range, max value: ${this.tileCount}`);
        const tiles = [this.width/TILESIZE, this.height/TILESIZE];
            
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