import { DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR, DEFAULT_BORDER_SIZE, DEFAULT_FONT, DEFAULT_TEXT_COLOR } from "../../../Globals";
import { FontAlign } from "../FontAlign";
import UIBox from "./UIBox";

export default class UITextbox
{
    
    static Render(context, x, y, width, height, text, {
        fontAlign = FontAlign.UNSET, xTextOffset = 0, yTextOffset = 0, 
        textColor = DEFAULT_TEXT_COLOR, bgColor=DEFAULT_BG_COLOR,
        borderColor = DEFAULT_BORDER_COLOR, borderSize=DEFAULT_BORDER_SIZE, font=DEFAULT_FONT,
        minWidth = 0, minHeight = 0, maxWidth = window.innerWidth, maxHeight = window.innerHeight
       } = {}) 
    {
        UIBox.Render(context, x, y, width, height, {
            bgColor: bgColor,
            borderSize: borderSize,
            borderColor: borderColor,
            minWidth: minWidth
        });

        let parsedWidth = Math.min(Math.max(width, minWidth), maxWidth);
        let parsedHeight = Math.min(Math.max(height, minHeight), maxHeight);

        context.font = font;
        const fontHeight = Number.parseInt(font.match(/[0-9]+(px)/)[0].replace("px", ""));
        switch(fontAlign)
        {
            case FontAlign.TOP_CENTER:
                xTextOffset += (parsedWidth/2)-(context.measureText(text).width/2);
                yTextOffset += fontHeight;
                break;
            case FontAlign.TOP_RIGHT:
                xTextOffset += (parsedWidth)-(context.measureText(text).width);
                break;
            case FontAlign.MID_LEFT:
                yTextOffset += (parsedHeight/2)+(fontHeight/2);
                break;
            case FontAlign.MID_CENTER:
                yTextOffset += (parsedHeight/2)+(fontHeight/2);
                xTextOffset += (parsedWidth/2)-(context.measureText(text).width/2);
                break;
            case FontAlign.MID_RIGHT:
                yTextOffset += (parsedHeight/2)+(fontHeight/2);
                xTextOffset += (parsedWidth)-(context.measureText(text).width);
                break;
            case FontAlign.BTM_LEFT:
                yTextOffset += (parsedHeight)-fontHeight;
                break;
            case FontAlign.BTM_CENTER:
                yTextOffset += (parsedHeight)-fontHeight;
                xTextOffset += (parsedWidth/2)-(context.measureText(text).width/2);
                break;
            case FontAlign.BTM_RIGHT:
                yTextOffset += (parsedHeight)-fontHeight;
                xTextOffset += (parsedWidth)-(context.measureText(text).width);
                break;
        }

        context.fillStyle = textColor;
        context.fillText(text, x+xTextOffset, y+yTextOffset);
    }
}