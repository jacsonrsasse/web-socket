import "reflect-metadata";
import * as process from "process";
import WebSocketServer from "../src/shared/http/web-socket.server";

const ws = new WebSocketServer();

export function initTestServer() {
  ws.listen(Number(process.env.SERVER_PORT) || 8081);
}

export function terminateTestServer() {
  ws.close();
}
