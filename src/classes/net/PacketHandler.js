import Tilemap from "../entities/Tilemap";
import ServerPacket from "./ServerPacket";

export default class PacketHandler
{
    constructor()
    {
        console.log("Hello wordl");
    }
    serverPackets = Object.fromEntries([
        [ServerPacket.AUTH_ERROR, () => {}],
        [ServerPacket.SERVER_HELLO,           this.serverHello],
        [ServerPacket.MAP_RESPONSE, (args) => {
            Tilemap.setData(args.bg, args.fg)
        }],
        [ServerPacket.SET_PLAYER, (args)   => console.log(`SPAWN PLAYER, args: ${args}`)],
    ]);

    parsePacket(serverPacketId, data)
    {
        if(!Object.keys(this.serverPackets).includes(`${serverPacketId}`))
            throw new Error(`No packet handler found for server packet ID: ${serverPacketId}`);
        
        this.serverPackets[serverPacketId](data);
    }

    authError(packet)
    {
        // login error parsing (wrong creds, error codes (ex: server full, offline, etc...)) 
    }

    serverHello(packet)
    {
        // Set client id / set server public / send client public 
    }
}
