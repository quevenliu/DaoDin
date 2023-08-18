import { WebSocketServer } from "ws";
const chatapp = require("./Websocket/chatapp");
const authorization = require("./utils/authorization").authorization;

class ExpressWebSocket extends WebSocket {

    constructor(ws) {
        super(ws);
    }

    status(code) {
        this.status = code;
        return this;
    }

    json(data) {
        if (this.status % 100 !== 2) {
            this.close();
            return this;
        }
        this.send(JSON.stringify(data));
        return this;
    }
}

class ExpressWebSocketServer extends WebSocketServer {
    constructor(app, options) {
        super(options);
        this.app = app;
    }

    on(event, callback) {
        super.on(event, (ws, req) => {
            const expressWs = new ExpressWebSocket(ws);
            callback(expressWs, req);
        });
    }
}

const chatServer = new ExpressWebSocketServer(chatapp, { port: 3001 });


/*When a connection is established, do the following things.

1. Use getUserID() to get the user ID from the connection. The user ID is stored as JWT in headers. There is a express middleware that does this for us, which is /utils/authorization.js. The middleware is not yet imported in this file. You need to import it.
2. Process the message using a function.
3. Use a function filterClients() to figure out which client we should send message to and which client we should not send message to.
4. Send the message to the clients that we should send message to.
*/

chatServer.on("connection", (connection, request) => {

    if (!connection.authorization_id) {
        authorization(request, connection, () => { });
        connection.authorization_id = request.authorization_id;
    }

    const app = chatServer.app;

    connection.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        app.processChat(parsedMessage, connection.authorization_id);
        const clients = chatServer.app.filterClients(chatServer.clients, app.groupFilterer(connection.authorization_id));
        clients.forEach(client => {
            client.send(JSON.stringify(parsedMessage));
        });
    });
});