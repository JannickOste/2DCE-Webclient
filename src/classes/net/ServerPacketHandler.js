
class ServerPacketHandler
{
    static packetHandler = Object.fromEntries([
        [ServerPacket.SERVER_HELLO, this.serverHello],
        [ServerPacket.MAP_RESPONSE, (args) => console.log(`MAP REPONSE, args: ${args}`)],
        [ServerPacket.SET_PLAYER, (args)   => console.log(`SPAWN PLAYER, args: ${args}`)],
    ]);

    static parsePacket(serverPacketId, data)
    {
        if(Object.keys(this.packetHandler).includes(`${serverPacketId}`))
            throw new Error(`No packet handler found for server packet ID: ${serverPacketId}`);
        
        this.packetHandlers[`${data.id}`](data.args);
    }
    static authError(packet)
    {
        // login error parsing (wrong creds, error codes (ex: server full, offline, etc...)) 
    }

    static serverHello(packet)
    {
        // Set client id / set server public / send client public 
        console.dir(packet);
    }
    
}

export default ServerPacketHandler;