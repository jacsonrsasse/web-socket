import URLParse from "url-parse";
import { Server, WebSocket } from "ws";

export default class WebSocketServer {
  private server!: Server;
  private sockets!: WebSocket[];

  constructor() {
    this.sockets = [];
  }

  listen(port: number) {
    this.server = new Server({
      port,
    });

    this.server.on("connection", this.onConnection.bind(this));

    console.log(`Server listening on ${port}`);
  }

  private onConnection(socket: WebSocket, request: any) {
    const urlParse = new URLParse(request.url, true);
    console.log(urlParse.query);
    this.sockets.push(socket);

    socket.send("conectado!");

    socket.onmessage = (message: any) => {
      this.sockets.forEach((s) => {
        s.send(message.data);
      });
    };

    socket.onclose = () => {
      console.log("Fechando uma conexão");
    };
  }
}
