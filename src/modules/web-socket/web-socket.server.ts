import { Server } from "ws";

export default class WebSocketServer {
  private server!: Server;

  construct() {
    this.server = new Server({
      port: 8000,
    });

    this.server.on("connection", this.onConnection);
    this.server.on("close", this.onClose);
    this.server.on("error", this.onError);
    this.server.on("listening", this.onListening);
  }

  private onConnection() {}
  private onClose() {}
  private onError() {}
  private onListening() {}
}
