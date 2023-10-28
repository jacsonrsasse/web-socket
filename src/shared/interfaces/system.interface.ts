import { WebSocket } from "ws";

export interface SystemInterface {
  add: (socket: WebSocket, request: any) => void;
  disconnectAll: () => void;
}
