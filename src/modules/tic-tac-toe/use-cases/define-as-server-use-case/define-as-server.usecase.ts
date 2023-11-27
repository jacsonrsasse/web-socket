import { Service, Inject } from "typedi";
import { Socket } from "socket.io";

import { TicTacToeServerSocketEvents } from "@modules/tic-tac-toe/enums/tic-tac-toe-server-socket-events.enum";
import { TicTacToeClientSocketEvents } from "@modules/tic-tac-toe/enums/tic-tac-toe-client-socket-events.enum";
import { TicTacToeLocalStorageRepository } from "@modules/tic-tac-toe/repositories/tic-tac-toe-local-storage.repository";
import { TicTacToeRooms } from "@modules/tic-tac-toe/enums/tic-tac-toe-rooms.enum";

@Service()
export class DefineAsServerUseCase {
  constructor(
    @Inject()
    private readonly ticTacToeRepository: TicTacToeLocalStorageRepository
  ) {}

  execute(socket: Socket) {
    if (this.ticTacToeRepository.hasServerSocket()) {
      console.log("Ja tem um conectado");
      // todo: implement change server connection if a new one income
      return;
    }

    socket.leave(TicTacToeRooms.LOBBY_ROOM);

    socket.removeAllListeners(TicTacToeServerSocketEvents.CREATE_USER_ROOM);
    socket.removeAllListeners(TicTacToeServerSocketEvents.RELATE_USER_ID);

    socket.join(TicTacToeRooms.SERVER_ROOM);

    socket.on(TicTacToeServerSocketEvents.DISCONNECT_CLIENT_SOCKET, (event) => {
      socket.nsp.in(event.body).disconnectSockets();
      socket.emit(TicTacToeClientSocketEvents.CLIENT_SOCKET_DISCONNECTED);
    });

    socket.emit(TicTacToeClientSocketEvents.DEFINED_AS_SERVER);
    this.ticTacToeRepository.saveServerSocket(socket.id);
  }
}
