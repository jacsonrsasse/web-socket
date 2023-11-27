import { Service, Inject } from "typedi";
import { Socket } from "socket.io";

import { SystemInterface } from "@shared/interfaces/system.interface";

import { TicTacToeRooms } from "./enums/tic-tac-toe-rooms.enum";
import { TicTacToeServerSocketEvents } from "./enums/tic-tac-toe-server-socket-events.enum";

import { DefineAsServerUseCase } from "./use-cases/define-as-server-use-case/define-as-server.usecase";
import { CreateUserRoomUseCase } from "./use-cases/create-user-room-use-case/create-user-room.usecase";
import { RelateUserIdUseCase } from "./use-cases/relate-user-id-use-case/relate-user-id.usecase";

@Service()
export default class TicTacToeSystem implements SystemInterface {
  constructor(
    @Inject() private readonly defineAsServerUseCase: DefineAsServerUseCase,
    @Inject() private readonly createUserRoomUseCase: CreateUserRoomUseCase,
    @Inject() private readonly relateUserIdUseCase: RelateUserIdUseCase
  ) {}

  handler(socket: Socket) {
    socket.on(TicTacToeServerSocketEvents.DEFINE_AS_SERVER, () =>
      this.defineAsServerUseCase.execute(socket)
    );

    socket.join(TicTacToeRooms.LOBBY_ROOM);

    socket.on(TicTacToeServerSocketEvents.CREATE_USER_ROOM, ({ body }) =>
      this.createUserRoomUseCase.execute(socket, body)
    );

    socket.on(TicTacToeServerSocketEvents.RELATE_USER_ID, ({ body }) =>
      this.relateUserIdUseCase.execute(socket, body)
    );
  }
}
