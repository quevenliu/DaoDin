const { WebSocketServer } = require("ws");
const chatapp = require("./Websocket/chatapp");
const authorization = require("./utils/authorization").authorization;
require('dotenv').config();

class ExpressWebSocketServer extends WebSocketServer {
    constructor(app, options) {
        super(options);
        this.app = app;
    }

    on(event, callback) {
        super.on(event, (ws, req) => {
            ws.httpStatus = 200;
            ws.status = (code) => {
                ws.httpStatus = code;
                return ws;
            };
            ws.json = (data) => {
                if (ws.httpStatus % 100 !== 2) {
                    ws.send(JSON.stringify(data));
                    ws.close();
                    return ws;
                }
                ws.send(JSON.stringify(data));
                return ws;
            };
            req.get = (key) => {
                if (req.headers[key])
                    return req.headers[key];
                else return req.headers[key.toLowerCase()];
            };
            callback(ws, req);
        });
    }
}

const chatServer = new ExpressWebSocketServer(chatapp, { port: 3001 });

chatServer.on("connection", (connection, req) => {

    const app = chatServer.app;

    connection.group_id = parseInt(req.url.split('?group_id=')[1]);

    if (!connection.group_id) {
        connection.status(400).json({ error: "No group_id provided" });
        return;
    }

    connection.on("message", async (body) => {

        try {
            connection.body = JSON.parse(body);

            if (!connection.authorization_id) {
                req.headers = {
                    Authorization: connection.body.Authorization
                };
                await authorization(req, connection, () => { });
                connection.authorization_id = req.authorization_id;
            }

            if (!connection.body.message) {
                connection.status(400).json({ error: "No message provided" });
                return;
            }

            await app.processChat(connection);
            const clients = chatServer.app.filterClients(chatServer.clients, await app.groupFilterer(connection));
            if (clients) {
                clients.forEach(client => {
                    client.send(JSON.stringify(connection.body));
                });
            }

        } catch (error) {
            console.log(error);
            connection.status(400).json({ error: "Not authorized to send message." });
        }
    });
});