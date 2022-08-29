import Player from "./entities/Player";
import Tilemap from "./entities/Tilemap";

export default class GameManager
{
    static async Update()
    {
        for(let updateCallback of [Tilemap.Update, Player.Update])
            await updateCallback();
        
    }

    static Render(context, spritesheet)
    {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        for(let renderCallback of [Tilemap.Render, Player.Render])
            renderCallback(context, spritesheet);

    }
}