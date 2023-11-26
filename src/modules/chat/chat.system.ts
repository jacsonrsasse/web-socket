import { SystemInterface } from "../../shared/interfaces/system.interface";
import { Socket } from "socket.io";

export class ChatSystem implements SystemInterface {
  private socket!: Socket;
  private currentRoom = "";

  private getSocketId() {
    return this.socket.id;
  }

  handler(socket: Socket) {}

  add(socket: Socket) {
    this.socket = socket;

    socket.on("send_message", (message: any) => {
      if (this.currentRoom) {
        socket.to(this.currentRoom).emit("message", message);
      }

      socket.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log(`Closing connection ${this.getSocketId()}`);
    });
  }

  joinRoom(room: string) {
    if (!this.socket) return;

    this.currentRoom = room;
    this.socket.join(room);

    this.socket.emit("joined", room);
  }
}
