import { Server, Socket } from "socket.io";
import { ValidSystems } from "../enums/valid-systems.enum";
import { isSystemValid } from "../validations/is-system-valid";
import { SystemConnectionFactory } from "../factory/system-connection.factory";
import { SystemInterface } from "../interfaces/system.interface";

export default class WebSocketServer {
  private server!: Server;

  listen(port: number) {
    this.server = new Server(port, {
      cors: {
        origin: true,
      },
    });

    this.server.on("connection", (socket: Socket) => {
      socket.on("select_system", (data: { system: string }) => {
        this.handleSocketSystemSelection(socket, data.system);
      });
    });
  }

  private handleSocketSystemSelection(socket: Socket, system: string) {
    if (!system) {
      return this.handleSocketDisconnect(socket, {
        code: 1015,
        message: "System value must be informed",
      });
    }

    const s = system as ValidSystems;

    if (!isSystemValid(s)) {
      return this.handleSocketDisconnect(socket, {
        code: 1008,
        message: "Invalid system informed",
      });
    }

    const systemConnection = SystemConnectionFactory.generateConnection(s);
    systemConnection.add(socket);
    systemConnection.joinRoom(s);

    socket.emit("connected", { success: true });
  }

  private handleSocketDisconnect(
    socket: Socket,
    error?: { code: number; message: string }
  ) {
    socket.emit("error", error);
    socket.disconnect(true);
  }
}
