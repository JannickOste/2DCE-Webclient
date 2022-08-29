import Player from "./entities/Player";
import Tilemap from "./entities/Tilemap";

export default class GameManager
{
    static async Update()
    {
        for(let updateCallback of [Player.Update, Tilemap.Update])
            await updateCallback();
        
    }

    static Render(context, spritesheet)
    {
        // Reset size (fixes resize isues.)
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        for(let renderCallback of [Tilemap.Render, Player.Render])
            renderCallback(context, spritesheet);

    }
}