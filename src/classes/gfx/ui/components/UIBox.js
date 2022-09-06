import { DEFAULT_BORDER_SIZE, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR } from "../../../Globals";

export default class UIBox
{
    static Render(context, x, y, width, height,  {
        bgColor=DEFAULT_BG_COLOR, borderColor = DEFAULT_BORDER_COLOR, borderSize = DEFAULT_BORDER_SIZE,
        minWidth = 0, minHeight = 0, maxWidth = window.innerWidth, maxHeight = window.innerHeight
       } = {}) 
    {
        let parsedWidth = Math.min(Math.max(width, minWidth), maxWidth);
        let parsedHeight = Math.min(Math.max(height, minHeight), maxHeight);

        UIBox.#DrawBox(context, x, y, parsedWidth, parsedHeight, borderColor); 
        UIBox.#DrawBox(context, x+borderSize, y+borderSize, parsedWidth-(borderSize*2), parsedHeight-(borderSize*2), bgColor);
    }

    static #DrawBox(context, x, y, width, height, bgColor)
    {
        context.fillStyle = bgColor;
        context.fillRect(x, y, width, height)
    }
}