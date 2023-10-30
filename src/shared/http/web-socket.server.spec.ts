import { CloseEvent, Server, WebSocket } from "ws";
import WebSocketServer from "./web-socket.server";
import { ChatSystem } from "../../modules/chat/chat.system";

describe("Web Socket Server", () => {
  let webSocketServer!: WebSocketServer;
  let socket!: Partial<WebSocket>;

  beforeAll(() => {
    webSocketServer = new WebSocketServer();
    webSocketServer.listen(8080);

    socket = {
      close: jest
        .fn()
        .mockImplementation((status: number, message: string) => {}),
    };
  });

  it("should create a server", () => {
    expect(webSocketServer["server"]).toBeInstanceOf(Server);
  });

  it("should trigger connection error because no system was informed", () => {
    webSocketServer["onConnection"](socket as WebSocket, {
      url: "ws://localhost:8080",
    });

    expect(socket.close).toHaveBeenCalledWith(
      1015,
      'Missing "system" identify parameter'
    );
  });

  it("should trigger connection error because system is invalid", () => {
    webSocketServer["onConnection"](socket as WebSocket, {
      url: "ws://localhost:8080/?system=test",
    });

    expect(socket.close).toHaveBeenCalledWith(1008, "Invalid system informed");
  });

  it("should create a new online system", () => {
    webSocketServer["onConnection"](socket as WebSocket, {
      url: "ws://localhost:8080/?system=chat",
    });

    expect(webSocketServer["onlineSystems"]).toMatchObject({
      chat: {},
    });

    expect(webSocketServer["onlineSystems"]["chat"]).toBeInstanceOf(ChatSystem);
  });

  it("should get the previous system", () => {
    webSocketServer["onConnection"](socket as WebSocket, {
      url: "ws://localhost:8080/?system=chat",
    });

    expect(webSocketServer["onlineSystems"]).toMatchObject({
      chat: {},
    });
  });

  it("should kill the server and remove all systems", () => {
    webSocketServer.kill();
    expect(webSocketServer["onlineSystems"]).not.toMatchObject({
      chat: {},
    });
  });
});
