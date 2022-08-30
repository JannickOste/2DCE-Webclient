import { FontAlign } from "./gfx/ui/FontAlign";

export const TICK_RATE_S = 60;
export const MS_PER_TICK = 1000/TICK_RATE_S;
export const TILESIZE = 32;

// GUI
export const DEFAULT_FONT = "16px Arial";
export const DEFAULT_BG_COLOR = "white";
export const DEFAULT_BG_ACTIVE_COLOR = "rgb(60, 60, 60)";
export const DEFAULT_TEXT_COLOR = "white";
export const DEFAULT_TEXT_ACTIVE_COLOR = "white";
export const DEFAULT_BORDER_COLOR = "blue";
export const DEFAULT_BORDER_SIZE = 3;

export const DEFAULT_GUI_PROPS = {
    fontAlign :FontAlign.UNSET, xTextOffset :0, yTextOffset: 0, textColor: DEFAULT_TEXT_COLOR,
    bgColor: DEFAULT_BG_COLOR, borderColor: DEFAULT_BORDER_COLOR, 
    font: DEFAULT_FONT
}
export const toCsvArray = (input) => input.split("\n").map(s => s.split(";"));