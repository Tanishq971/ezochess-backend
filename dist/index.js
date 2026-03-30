import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager.js';
//we have to create an object of game handler here to use its functions
const wss = new WebSocketServer({ port: 8080 });
const manager = new GameManager();
wss.on('connection', function connection(ws) {
    manager.addUser(ws); //calling function to add the socket to the queue
    ws.send('Started the game...');
});
//# sourceMappingURL=index.js.map