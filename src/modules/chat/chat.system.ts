import { WebSocket } from "ws";
import { SystemInterface } from "../../shared/interfaces/system.interface";

export class ChatSystem implements SystemInterface {
  private sockets: WebSocket[] = [];

  add(socket: WebSocket, request: any) {
    this.sockets.push(socket);

    socket.onmessage = (message: any) => {
      this.sockets.forEach((s) => {
        s.send(message.data);
      });
    };

    socket.onclose = () => {
      console.log("Fechando uma conexão");

      this.sockets = this.sockets.filter((s) => s !== socket);
    };
  }

  disconnectAll() {
    this.sockets.forEach((s) => s.close());
  }
}
