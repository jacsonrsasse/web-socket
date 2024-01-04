import { SystemInterface } from "../../shared/interfaces/system.interface";
import { Socket } from "socket.io";
import { Inject, Service } from "typedi";
import { ChatServerSocketEvents } from "./enums/chat-server-socket-events.enum";
import { ChatClientSocketEvents } from "./enums/chat-client-socket-events.enum";
import { ChatStorage } from "@storage/chat/chat.storage";

@Service()
export class ChatSystem implements SystemInterface {
  constructor(@Inject() private readonly chatStorage: ChatStorage) {}

  handler(socket: Socket) {
    this.chatStorage.addUser(socket.id);

    socket.on(ChatServerSocketEvents.SEND_MESSAGE, (data: any) => {
      socket.emit(ChatClientSocketEvents.RECEIVE_MESSAGE, data);
    });

    socket.on(ChatServerSocketEvents.JOIN_ROOM, (room: string) => {});

    socket.on(ChatServerSocketEvents.EXIT_ROOM, (room: string) => {});
  }

  // add(socket: Socket) {
  //   this.socket = socket;

  //   socket.on("send_message", (message: any) => {
  //     if (this.currentRoom) {
  //       socket.to(this.currentRoom).emit("message", message);
  //     }

  //     socket.emit("message", message);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log(`Closing connection ${this.getSocketId()}`);
  //   });
  // }

  // joinRoom(room: string) {
  //   if (!this.socket) return;

  //   this.currentRoom = room;
  //   this.socket.join(room);

  //   this.socket.emit("joined", room);
  // }
}
