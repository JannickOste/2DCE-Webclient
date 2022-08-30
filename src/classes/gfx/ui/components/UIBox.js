import { DEFAULT_BORDER_SIZE, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR } from "../../../Globals";

export default class UIBox
{
    static Render(context, x, y, width, height,  {
        bgColor=DEFAULT_BG_COLOR, borderColor = DEFAULT_BORDER_COLOR, borderSize = DEFAULT_BORDER_SIZE
       } = {}) 
    {
        UIBox.#DrawBox(context, x, y, width, height, borderColor); 
        UIBox.#DrawBox(context, x+borderSize, y+borderSize, width-(borderSize*2), height-(borderSize*2), bgColor);
    }

    static #DrawBox(context, x, y, width, height, bgColor)
    {
        context.fillStyle = bgColor;
        context.fillRect(x, y, width, height)
    }
}