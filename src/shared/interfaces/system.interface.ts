import { Socket } from "socket.io";
import { ValidSystems } from "../enums/valid-systems.enum";

export interface SystemInterface {
  add: (socket: Socket) => void;
  joinRoom: (room: string | ValidSystems) => void;
}
