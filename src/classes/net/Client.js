import ClientPacket from "./ClientPacket";
import PacketHandler from "./PacketHandler";

export class Client
{
    static #id;
    static #socket;
    static #packetHandler = new PacketHandler();
    static localId = -1;

    static get Connected() { return Client.#socket && Client.#socket.OPEN}

    /**
     * Connect to game server.
     * 
     * @returns void
     */
    static async Connect(username, password)
    {
        return new Promise((resolve, reject) => {
            try
            {
                Client.#socket = new WebSocket('ws://localhost:8080/ws')

                // Set client socket events.
                Client.#socket.onopen    = ()     => {
                    console.log("Connection to server established, sending credentials...");
                    this.sendPacket(ClientPacket.AUTHENTICATE, {
                        username: username,//"hello",
                        password: password//"hello world"
                    });
    
                    resolve();
                }; 

                Client.#socket.onmessage = packet => Client.#handlePacket(packet.data); // todo: add crypt layer
                Client.#socket.onerror   = error  => Client.#onSocketException(error);
            } catch(e)
            {
                reject(e);
            }
        });
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
                    this.#packetHandler.parsePacket(data.id, data.args);
                }
                catch(e)
                {
                    this.#onSocketException(e);
                }
            }

        }
        catch(e)
        {
            console.log(`Error processing server packet[Data => ${packet}]`);
        }
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

        this.#socket.close();
    }

    static sendPacket(clientPacket, data)
    {
        // Parse packet data, encrypt & send through socket.

        this.#socket.send(JSON.stringify({
            id: clientPacket,
            args: data
        }));
    }

}