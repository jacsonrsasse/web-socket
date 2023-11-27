import "reflect-metadata";

import WebSocketServer from "@shared/http/web-socket.server";
import * as process from "process";

const ws = new WebSocketServer();
ws.listen(Number(process.env.SERVER_PORT) || 8080);
