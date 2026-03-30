import { WebSocket } from "ws";
import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";
export class GameManager {
    users;
    pendingUser;
    games;
    constructor() {
        this.users = [];
        this.pendingUser = null;
        this.games = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    addHandler(socket) {
        socket.on('error', console.error);
        socket.on('message', (raw) => {
            const message = JSON.parse(raw.toString());
            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    const newGame = new Game(this.pendingUser, socket); //created the game instance 
                    this.games.push(newGame);
                    this.pendingUser = null;
                }
                else {
                    socket.send(JSON.stringify({
                        type: "waiting_in_lobby"
                    }));
                    this.pendingUser = socket;
                }
            }
            if (message.type === MOVE) {
                const game = this.games.find(g => g.player1 == socket || g.player2 == socket);
                if (!game)
                    return;
                game.makeMove(socket, message.payload);
            }
        });
    }
}
//# sourceMappingURL=GameManager.js.map