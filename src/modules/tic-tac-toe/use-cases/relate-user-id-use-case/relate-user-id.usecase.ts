import { Inject, Service } from "typedi";
import { TicTacToeStorage } from "../../storage/tic-tac-toe.storage";
import { TicTacToeClientSocketEvents } from "../../enums/tic-tac-toe-client-socket-events.enum";

@Service()
export class RelateUserIdUseCase {
  constructor(@Inject() private readonly ticTacToeStorage: TicTacToeStorage) {}

  execute(body: string) {
    try {
      this.ticTacToeStorage.serverSocket.emit(
        TicTacToeClientSocketEvents.RELATE_USER_ID,
        body
      );
    } catch (error) {}
  }
}
