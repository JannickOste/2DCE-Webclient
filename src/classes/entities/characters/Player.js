import { TILESIZE } from "../../Globals";
import { Client } from "../../net/Client";
import { Camera } from "../Camera";

export default class Player 
{
    id = -1;
    characterID = 40;
    position = {x: 0, y: 0}
    #facingDirection = 2;
    static #players = {}


    static get Players() 
    {
        return this.#players;
    }


    constructor(id, x, y)
    {
        this.id = id;
        this.position = {
            x: x, 
            y: y
        }

        Player.#players[id] = this;
    }

    Render(context, spritesheet) 
    {
        context.restore();
        context.save();

        const area = spritesheet.getTileArea(this.characterID);

        const degree = [0, 1, 2, 3].map(i => -180+(i*90))[this.#facingDirection];
        const rad = degree * Math.PI / 180;

        const x =  (Math.ceil(((window.innerWidth/2)/TILESIZE))*TILESIZE)+(Camera.offset.x)+(this.position.x*TILESIZE)
        const y =  (Math.ceil(((window.innerHeight/2)/TILESIZE))*TILESIZE)+(Camera.offset.y)+(this.position.y*TILESIZE)

        context.drawImage(spritesheet.imageElement, area.x, area.y, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
        
        context.restore();
    }

    static get Local() {return Player.#players[Client.localId]; }

    static SetPosition(id, x, y)
    {
        const player = Player.#players[id];
        if(player)
        {
            player.position = {
                x: x, 
                y: y
            }
        } else new Player(id, x, y);
    }

    Update()
    {
        if(Player.Local == this)
            Camera.SetToPosition(this.position);
    }
}