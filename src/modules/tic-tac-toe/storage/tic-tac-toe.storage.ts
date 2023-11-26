import { Socket } from "socket.io";
import { Service } from "typedi";

@Service()
export class TicTacToeStorage {
  private _serverSocket!: Socket;
  private _rooms!: Array<string>;

  set serverSocket(socket: Socket) {
    this._serverSocket = socket;
  }

  get serverSocket() {
    return this._serverSocket;
  }

  addRoom(roomName: string) {
    this._rooms.push(roomName);
  }

  removeRoom(roomName: string) {
    this._rooms = this._rooms.splice(this._rooms.indexOf(roomName));
  }
}
