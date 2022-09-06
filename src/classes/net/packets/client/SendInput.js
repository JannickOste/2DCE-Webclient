import { Client } from "../../Client"
import ClientPacket from "../../ClientPacket"

export const SendInput = (x, y, shift) => Client.sendPacket(ClientPacket.SEND_INPUT, { x: x,  y: y, mod: shift});