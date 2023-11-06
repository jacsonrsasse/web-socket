import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SystemInterface } from "../../shared/interfaces/system.interface";
import { ValidSystems } from "../../shared/enums/valid-systems.enum";

export default class TicTacToeSystem implements SystemInterface {
  private socket!: Socket;
  private currentRoom = "";
  private isServerConnection = false;

  add(socket: Socket) {
    socket.on("define_as_server", () => {
      this.isServerConnection = true;
    });

    this.socket = socket;
  }

  joinRoom(room: string) {
    if (!this.socket || room !== ValidSystems.TicTacToe) return;

    this.currentRoom = room;
    this.socket.join(room);
  }
}
