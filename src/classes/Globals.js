export const TICK_RATE_S = 60;
export const MS_PER_TICK = 1000/TICK_RATE_S;
export const TILESIZE = 32;

export const toCsvArray = (input) => input.split("\n").map(s => s.split(";"));