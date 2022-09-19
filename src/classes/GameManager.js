import Tilemap from "./entities/Tilemap";
import GUI from "./gfx/GUI";
import InputHandler from "./io/InputHandler";
import { StartMenu } from "./gfx/ui/models/StartMenu";
import Player from "./entities/characters/Player";

export default class GameManager
{
    static running = false;

    static async Load() 
    {
        InputHandler.inputOveride = StartMenu.Move;
        GUI.currentRenderer = StartMenu;
    }

    static async Update()
    {
        if(Player.Local)
            Player.Local.Update();
            
        GUI.Update();
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
        for(let renderCallback of [ GameManager.#resetCanvas, Tilemap.Render, ])
            renderCallback(context, spritesheet);

        GUI.Render(context, spritesheet);
        for(let entity of Object.values(Player.Players))
            entity.Render(context, spritesheet)
    }

    static Exit()
    {

    }
}