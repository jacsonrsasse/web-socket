import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SystemInterface } from "../../shared/interfaces/system.interface";

export default class TicTacToeSystem implements SystemInterface {
  add(socket: Socket) {}

  joinRoom(room: string) {}
}
