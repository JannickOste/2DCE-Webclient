import { DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR, DEFAULT_BORDER_SIZE, DEFAULT_FONT, DEFAULT_TEXT_COLOR } from "../../../Globals";
import { FontAlign } from "../FontAlign";
import UIBox from "./UIBox";

export default class UITextbox
{
    
    static Render(context, x, y, width, height, text, {
        fontAlign = FontAlign.UNSET, xTextOffset = 0, yTextOffset = 0, 
        textColor = DEFAULT_TEXT_COLOR, bgColor=DEFAULT_BG_COLOR,
        borderColor = DEFAULT_BORDER_COLOR, borderSize=DEFAULT_BORDER_SIZE, font=DEFAULT_FONT
       } = {}) 
    {
        UIBox.Render(context, x, y, width, height, {
            bgColor: bgColor,
            borderSize: borderSize,
            borderColor: borderColor
        });

        context.font = font;
        const fontHeight = Number.parseInt(font.match(/[0-9]+(px)/)[0].replace("px", ""));
        switch(fontAlign)
        {
            case FontAlign.TOP_CENTER:
                xTextOffset += (width/2)-(context.measureText(text).width/2);
                yTextOffset += fontHeight;
                break;
            case FontAlign.TOP_RIGHT:
                xTextOffset += (width)-(context.measureText(text).width);
                break;
            case FontAlign.MID_LEFT:
                yTextOffset += (height/2)+(fontHeight/2);
                break;
            case FontAlign.MID_CENTER:
                yTextOffset += (height/2)+(fontHeight/2);
                xTextOffset += (width/2)-(context.measureText(text).width/2);
                break;
            case FontAlign.MID_RIGHT:
                yTextOffset += (height/2)+(fontHeight/2);
                xTextOffset += (width)-(context.measureText(text).width);
                break;
            case FontAlign.BTM_LEFT:
                yTextOffset += (height)-fontHeight;
                break;
            case FontAlign.BTM_CENTER:
                yTextOffset += (height)-fontHeight;
                xTextOffset += (width/2)-(context.measureText(text).width/2);
                break;
            case FontAlign.BTM_RIGHT:
                yTextOffset += (height)-fontHeight;
                xTextOffset += (width)-(context.measureText(text).width);
                break;
        }

        context.fillStyle = textColor;
        context.fillText(text, x+xTextOffset, y+yTextOffset);
    }
}