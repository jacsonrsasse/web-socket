import { TicTacToeStorage } from "@storage/tic-tac-toe/tic-tac-toe.storage";
import { Inject, Service } from "typedi";

@Service()
export class TicTacToeLocalStorageRepository {
  constructor(@Inject() private readonly ticTacToeStorage: TicTacToeStorage) {}

  saveServerSocket(socketId: string) {
    this.ticTacToeStorage.serverSocketId = socketId;
  }

  findServerSocketId(): string {
    return this.ticTacToeStorage.serverSocketId;
  }

  hasServerSocket(): boolean {
    return !!this.findServerSocketId();
  }

  saveNewRoom(roomId: string) {
    this.ticTacToeStorage.addRoom(roomId);
  }

  existsRoom(roomId: string): boolean {
    return this.ticTacToeStorage.rooms.indexOf(roomId) > -1;
  }

  deleteRoom(roomId: string) {
    this.ticTacToeStorage.removeRoom(roomId);
  }
}
