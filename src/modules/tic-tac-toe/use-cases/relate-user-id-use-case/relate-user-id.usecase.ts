import { Socket } from "socket.io";
import { Inject, Service } from "typedi";
import { TicTacToeClientSocketEvents } from "@modules/tic-tac-toe/enums/tic-tac-toe-client-socket-events.enum";
import { TicTacToeLocalStorageRepository } from "@modules/tic-tac-toe/repositories/tic-tac-toe-local-storage.repository";

@Service()
export class RelateUserIdUseCase {
  constructor(
    @Inject()
    private readonly ticTacToeRepository: TicTacToeLocalStorageRepository
  ) {}

  execute(socket: Socket, body: string) {
    console.log("Aqui");
    try {
      socket.nsp
        .in(this.ticTacToeRepository.findServerSocketId())
        .emit(TicTacToeClientSocketEvents.RELATE_USER_ID, body);
    } catch (error) {
      socket.nsp
        .in(this.ticTacToeRepository.findServerSocketId())
        .emit(TicTacToeClientSocketEvents.ERROR_TO_RELATE_USER_ID, body);
    }
  }
}
