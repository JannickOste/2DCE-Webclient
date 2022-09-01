import Player from "./entities/Player";
import Tilemap from "./entities/Tilemap";
import EventHandler from "./ActionHandler";
import GUI from "./gfx/GUI";
import InputHandler from "./io/InputHandler";
import { StartMenu } from "./gfx/ui/models/StartMenu";
import { Area } from "./entities/Tilemap";

export default class GameManager
{
    static actionHandler = new EventHandler();
    static running = false;

    static asyncUpdateQueue = [];
    
    static async Load() 
    {
        InputHandler.inputOveride = StartMenu.Move;
        GUI.currentRenderer = StartMenu;
        Tilemap.currentArea = Area.TEST;
    }

    static async Update()
    {
        let asyncCall = null;
        while((asyncCall = GameManager.asyncUpdateQueue.shift()))
            await asyncCall();

        Player.Update();
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
        for(let renderCallback of [ GameManager.#resetCanvas, Tilemap.Render, Player.Render, GUI.Render])
            renderCallback(context, spritesheet);
    }

    static Exit()
    {

    }
}