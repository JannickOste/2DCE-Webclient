import ServerPacketHandler from "./ServerPacketHandler";

export class Client
{
    static #id;
    static #socket;

    /**
     * Connect to game server.
     * 
     * @returns void
     */
    static Connect()
    {
        super();

        const WebSocket = require("ws");
        Client.#socket = new WebSocket('ws://localhost:8080/ws')

        // Set client socket events.
        Client.#socket.onopen    = ()     => Client.#onClientConnect();
        Client.#socket.onmessage = packet => Client.#handlePacket(packet.data);
        Client.#socket.onerror   = error  => Client.#onSocketException(error);
    }

    /**
     * Attempt to parse incoming server packets and pass through to packet handler.
     * 
     * @param {{id: number, args: object} | Array<{id: number, args: object}>} packet  Server packet
     * @returns void
     */
    static #handlePacket(packet)
    {
        // Parse incoming server packet(s), multi packet support
        try
        {
            
            const data = JSON.parse(packet);
            if(data instanceof Array)
            {
                for(let obj of data)
                    Client.#handlePacket(JSON.stringify(obj));

                return;
            }
                
            if(!(data instanceof Object))
                throw new Error("Invalid packet datatype");
            
            if(data.id !== undefined)
            {
                try
                {
                    ServerPacketHandler.parsePacket(data.id, data.args);
                }
                catch(e)
                {
                    this.#onSocketException(err);
                }
            }

        }
        catch(e)
        {
            console.log(`Error processing server packet[Data => ${packet}]`);
        }
    }

    /**
     * On server connection established.
     * 
     * @returns void
     */
    static #onClientConnect()
    {
        console.log("Connection to server established...");
    }
    
    /**
     * On socket exception
     * @param {*} err 
     * 
     * @returns void
     */
    static #onSocketException(err)
    {
        // Packet or socket exception handling (kick client, resend to auth screen)
        console.log(err);

        this.#socket.close();
    }

    static sendPacket(clientPacket, data)
    {
        // Parse packet data, encrypt & send through socket.
    }
}