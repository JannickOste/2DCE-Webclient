import { DEFAULT_BG_ACTIVE_COLOR, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR, DEFAULT_FONT, DEFAULT_TEXT_ACTIVE_COLOR, DEFAULT_TEXT_COLOR } from "../../../Globals";
import { FontAlign } from "../FontAlign";
import UITextbox from "./UITextbox";

export default class UIHorizontalMenu
{
    
    static Render(context, x, y, width, height, options, {
        fontAlign = FontAlign.UNSET, xTextOffset = 0, yTextOffset = 0, 
        textColor = DEFAULT_TEXT_COLOR, textActiveColor=DEFAULT_TEXT_ACTIVE_COLOR, bgColor=DEFAULT_BG_COLOR, bgActiveColor = DEFAULT_BG_ACTIVE_COLOR,
        borderColor = DEFAULT_BORDER_COLOR, font=DEFAULT_FONT, selectedIndex = 0
       } = {}) 
    {
        const keys = Object.keys(options);
        const heightSlice = height/keys.length;
        for(let index in keys)
        { 
            const txt = keys[index]
            const yCurrent = y+(heightSlice*index)+(index > 0 ? -1 : 0);
            UITextbox.Render(context, x, yCurrent, width, heightSlice, txt, {
                fontAlign: fontAlign, 
                bgColor: (index == selectedIndex ? bgActiveColor : bgColor),
                borderColor: borderColor, 
                textColor: (index == selectedIndex ? textActiveColor : textColor),
                font: font,
                xTextOffset: xTextOffset,
                yTextOffset:yTextOffset
            });
        }
    }
}