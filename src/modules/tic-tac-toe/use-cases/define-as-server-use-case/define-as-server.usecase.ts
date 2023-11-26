import { Socket } from "socket.io";
import { TicTacToeServerSocketEvents } from "../../enums/tic-tac-toe-server-socket-events.enum";
import { TicTacToeClientSocketEvents } from "../../enums/tic-tac-toe-client-socket-events.enum";
import { TicTacToeRooms } from "../../enums/tic-tac-toe-rooms.enum";
import { TicTacToeStorage } from "../../storage/tic-tac-toe.storage";
import { Service, Inject } from "typedi";

@Service()
export class DefineAsServerUseCase {
  constructor(@Inject() private readonly ticTacToeStorage: TicTacToeStorage) {}

  execute(socket: Socket) {
    if (this.ticTacToeStorage.serverSocket) {
      console.log("Ja tem um conectado");
      // todo: implement change server connection if a new one income
      return;
    }

    socket.leave(TicTacToeRooms.LOBBY_ROOM);

    socket.removeAllListeners(TicTacToeServerSocketEvents.CREATE_USER_ROOM);

    socket.join(TicTacToeRooms.SERVER_ROOM);

    socket.on(TicTacToeServerSocketEvents.DISCONNECT_CLIENT_SOCKET, (event) => {
      socket.nsp.in(event.body).disconnectSockets();
      socket.emit(TicTacToeClientSocketEvents.CLIENT_SOCKET_DISCONNECTED);
    });

    socket.emit(TicTacToeClientSocketEvents.DEFINED_AS_SERVER);
    this.ticTacToeStorage.serverSocket = socket;
  }
}
