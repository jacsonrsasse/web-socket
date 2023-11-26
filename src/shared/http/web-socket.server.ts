import { Server, Socket } from "socket.io";
import { ValidSystems } from "../enums/valid-systems.enum";
import { SystemInterface } from "../interfaces/system.interface";
import { ChatSystem } from "../../modules/chat/chat.system";
import TicTacToeSystem from "../../modules/tic-tac-toe/tic-tac-toe.system";
import { Container } from "typedi";

export default class WebSocketServer {
  private server!: Server;

  listen(port: number) {
    this.server = new Server(port, {
      cors: {
        origin: true,
      },
    });

    this.createHandler(ValidSystems.Chat, Container.get(ChatSystem));
    this.createHandler(ValidSystems.TicTacToe, Container.get(TicTacToeSystem));
  }

  private createHandler(namespace: string, systemHandler: SystemInterface) {
    const nsp = this.server.of(namespace);

    nsp.on("connection", (socket: Socket) => systemHandler.handler(socket));
  }
}
