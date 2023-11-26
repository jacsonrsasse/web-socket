import { Namespace, Socket } from "socket.io";
import { SystemInterface } from "../../shared/interfaces/system.interface";
import { TicTacToeServerSocketEvents } from "./enums/tic-tac-toe-server-socket-events.enum";
import { TicTacToeClientSocketEvents } from "./enums/tic-tac-toe-client-socket-events.enum";

const SERVER_ROOM = "server";
const LOBBY_ROOM = "lobby";

export default class TicTacToeSystem implements SystemInterface {
  private serverSocket!: Socket;
  private rooms: Array<string> = [];

  handler(socket: Socket) {
    socket.on(TicTacToeServerSocketEvents.DEFINE_AS_SERVER, () =>
      this.defineAsServerHandler(socket)
    );

    socket.join(LOBBY_ROOM);

    socket.on(TicTacToeServerSocketEvents.CREATE_USER_ROOM, ({ body }) =>
      this.createUserRoomHandler(socket, body)
    );

    socket.on(TicTacToeServerSocketEvents.RELATE_USER_ID, ({ body }) =>
      this.relateUserIdHandler(body)
    );
  }

  private defineAsServerHandler(socket: Socket) {
    if (this.serverSocket) {
      console.log("Ja tem um conectado");
      // todo: implement change server connection if a new one income
      return;
    }
    socket.leave(LOBBY_ROOM);

    socket.removeAllListeners(TicTacToeServerSocketEvents.CREATE_USER_ROOM);

    socket.join(SERVER_ROOM);

    socket.on(TicTacToeServerSocketEvents.DISCONNECT_CLIENT_SOCKET, (event) => {
      socket.nsp.in(event.body).disconnectSockets();
      socket.emit(TicTacToeClientSocketEvents.CLIENT_SOCKET_DISCONNECTED);
    });

    socket.emit(TicTacToeClientSocketEvents.DEFINED_AS_SERVER);
    this.serverSocket = socket;
  }

  private createUserRoomHandler(socket: Socket, body: string) {
    try {
      if (!this.serverSocket)
        return socket.emit(TicTacToeClientSocketEvents.SERVER_OFFLINE);

      socket.join(body);
      this.rooms.push(body);

      socket.emit(TicTacToeClientSocketEvents.CONNECTED_IN_ROOM, body);
    } catch (error) {
      socket.disconnect();
      this.serverSocket.emit(TicTacToeClientSocketEvents.CREATE_ROOM_ERROR);
    }
  }

  private relateUserIdHandler(body: string) {
    try {
      this.serverSocket.emit(TicTacToeClientSocketEvents.RELATE_USER_ID, body);
    } catch (error) {}
  }
}
