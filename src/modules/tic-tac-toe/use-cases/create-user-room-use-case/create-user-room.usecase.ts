import { Socket } from "socket.io";
import { Inject, Service } from "typedi";

import { TicTacToeClientSocketEvents } from "@modules/tic-tac-toe/enums/tic-tac-toe-client-socket-events.enum";
import { TicTacToeLocalStorageRepository } from "@modules/tic-tac-toe/repositories/tic-tac-toe-local-storage.repository";

@Service()
export class CreateUserRoomUseCase {
  constructor(
    @Inject()
    private readonly ticTacToeRepository: TicTacToeLocalStorageRepository
  ) {}

  execute(socket: Socket, body: string) {
    try {
      if (!this.ticTacToeRepository.hasServerSocket())
        return socket.emit(TicTacToeClientSocketEvents.SERVER_OFFLINE);

      socket.join(body);
      this.ticTacToeRepository.saveNewRoom(body);

      socket.emit(TicTacToeClientSocketEvents.CONNECTED_IN_ROOM, body);
    } catch (error) {
      socket.disconnect();

      socket.nsp
        .in(this.ticTacToeRepository.findServerSocketId())
        .emit(TicTacToeClientSocketEvents.CREATE_ROOM_ERROR);
    }
  }
}
