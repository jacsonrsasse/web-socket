import URLParse from "url-parse";
import { Server, WebSocket } from "ws";
import { isSistemValid } from "../validations/is-sistem-valid";
import { SubscriberFactory } from "../factory/subscriber-factory";
import { ValidSistems } from "../enums/valid-sistems.enum";
import { SystemInterface } from "../interfaces/system.interface";

export default class WebSocketServer {
  private server!: Server | undefined;
  private onlineSystems: { [system: string]: SystemInterface } = {};

  listen(port: number) {
    this.server = new Server({
      port,
    });

    this.server.on("connection", this.onConnection.bind(this));

    console.log(`Server listening on ${port}`);
  }

  kill() {
    if (!this.server) return;

    this.server.close();

    Object.keys(this.onlineSystems).forEach((key) => {
      this.onlineSystems[key].disconnectAll();
    });

    this.onlineSystems = {};

    delete this.server;
  }

  private onConnection(socket: WebSocket, request: any) {
    const urlParse = new URLParse(request.url, true);
    const query = urlParse.query;

    if (!query.system) {
      socket.close(1015, 'Missing "system" identify parameter');
      return;
    }

    const system = query.system as ValidSistems;

    if (!isSistemValid(system)) {
      socket.close(1008, "Invalid system informed");
      return;
    }

    let subscriber: SystemInterface;
    if (!this.onlineSystems[system]) {
      subscriber = SubscriberFactory.getSubscriber(system);
      this.onlineSystems[system] = subscriber;
    } else {
      subscriber = this.onlineSystems[system];
    }

    subscriber.add(socket, request);
  }
}
