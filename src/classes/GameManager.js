import Player from "./entities/Player";
import Tilemap from "./entities/Tilemap";
import ActionHandler from "./ActionHandler";

export default class GameManager
{
    static actionHandler = new ActionHandler();
    static async Load() 
    {
        await Tilemap.Load();
    }

    static async Update()
    {
        Player.Update();
    }

    static #resetCanvas = (context) => 
    {
        // Reset size (fixes resize isues.)
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    static Render(context, spritesheet)
    {
        for(let renderCallback of [ GameManager.#resetCanvas, Tilemap.Render, Player.Render])
            renderCallback(context, spritesheet);
    }
}