import { Socket } from "socket.io";

export interface SystemInterface {
  handler: (socket: Socket) => void;
}
