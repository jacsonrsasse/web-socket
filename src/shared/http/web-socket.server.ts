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

    Object.values(ValidSystems).forEach((value) => {
      const nsp = this.server.of(
        value,
        SystemConnectionFactory.generateConnection(value as ValidSystems)
          .handler
      );

      nsp.on(
        "connection",
        SystemConnectionFactory.generateConnection(value as ValidSystems)
          .handler
      );
    });
  }
}
