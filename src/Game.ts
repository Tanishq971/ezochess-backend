import { WebSocket } from "ws"
import { Chess } from 'chess.js'
import { MOVE, GAME_OVER, INIT_GAME } from "./messages.js";


export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: string[]
  private StartTime: Date;
  public GameID: number;
  constructor(player1: WebSocket, player2: WebSocket) {
    this.StartTime = new Date()
    this.moves = []
    this.board = new Chess();
    this.player1 = player1;
    this.player2 = player2;
    this.GameID = Math.floor(Math.random() * 10 + 100000);

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        gameid: this.GameID,
        color: "black",
      }
    }))

    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        gameid: this.GameID,
        color: "white",
      }
    }))
  }

  makeMove(socket: WebSocket, move: { from: string, to: string }) {
    console.log("make move func")
    // if (this.board.turn() == 'w' && socket != this.player1) return;
    // if (this.board.turn() == 'b' && socket != this.player2) return;



    // console.log("Came here to move page ... and the move is ---" , isValid)
    // if (!isValid) {
    //       console.log(isValid , "Move ----" , move)
    // };

    try {
      const isValid = this.board.move(move);


      if (this.board.isGameOver()) {
        this.player1.send(JSON.stringify({
          type: GAME_OVER,
          payload: this.board.turn() === 'b' ? "White" : "Black"
        }))
        this.player2.send(JSON.stringify({
          type: GAME_OVER,
          payload: this.board.turn() === 'b' ? "White" : "Black"
        }))
        return
      }
      

      this.player2.send(JSON.stringify({
        type: MOVE,
        payload: isValid,
        isCheck:this.board.isCheck(),
        isCheckMate:this.board.isCheckmate()
      }))


      this.player1.send(JSON.stringify({
        type: MOVE,
        payload: isValid,
        isCheck:this.board.isCheck(),
        isCheckMate:this.board.isCheckmate()
      }))


    } catch (e) {
      console.log("error --- ", e);
    }
  }
}