import { Socket } from "socket.io";
import { Service } from "typedi";

@Service()
export class TicTacToeStorage {
  private _serverSocketId!: string;
  private _rooms!: Array<string>;

  set serverSocketId(socketId: string) {
    this._serverSocketId = socketId;
  }

  get serverSocketId() {
    return this._serverSocketId;
  }

  addRoom(roomName: string) {
    this._rooms.push(roomName);
  }

  removeRoom(roomName: string) {
    this._rooms = this._rooms.splice(this._rooms.indexOf(roomName));
  }

  get rooms() {
    return this._rooms;
  }
}
