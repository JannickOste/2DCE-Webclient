import InputHandler from "../io/InputHandler";

/**
 * Will implement state based system in the future, testing base, works but isn't efficient.
 */
export default class GUI
{
    static currentRenderer;
    
    static Render(context, spritesheet)
    {
        if(GUI.currentRenderer && GUI.currentRenderer.Render) 
            GUI.currentRenderer.Render(context, spritesheet);
    }

    static Update() 
    {

    }

    static Flush() 
    {
        GUI.currentRenderer = undefined;
        InputHandler.inputOveride = undefined; 
    }

    static resetCanvas = (context) => 
    {
        // Reset size (fixes resize isues.)
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}