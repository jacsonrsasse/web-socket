import { Socket } from "socket.io";
import { Inject, Service } from "typedi";
import { TicTacToeStorage } from "../../storage/tic-tac-toe.storage";
import { TicTacToeClientSocketEvents } from "../../enums/tic-tac-toe-client-socket-events.enum";

@Service()
export class CreateUserRoomUseCase {
  constructor(@Inject() private readonly ticTacToeStorage: TicTacToeStorage) {}

  execute(socket: Socket, body: string) {
    try {
      if (!this.ticTacToeStorage.serverSocket)
        return socket.emit(TicTacToeClientSocketEvents.SERVER_OFFLINE);

      socket.join(body);
      this.ticTacToeStorage.addRoom(body);

      socket.emit(TicTacToeClientSocketEvents.CONNECTED_IN_ROOM, body);
    } catch (error) {
      socket.disconnect();
      this.ticTacToeStorage.serverSocket.emit(
        TicTacToeClientSocketEvents.CREATE_ROOM_ERROR
      );
    }
  }
}
