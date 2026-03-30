import { WebSocket } from "ws";
export declare class GameManager {
    private users;
    private pendingUser;
    private games;
    constructor();
    addUser(socket: WebSocket): void;
    addHandler(socket: WebSocket): void;
}
//# sourceMappingURL=GameManager.d.ts.map