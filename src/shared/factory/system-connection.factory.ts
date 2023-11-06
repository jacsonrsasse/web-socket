import { ChatSystem } from "../../modules/chat/chat.system";
import TicTacToeSystem from "../../modules/tic-tac-toe/tic-tac-toe.system";
import { ValidSystems } from "../enums/valid-systems.enum";
import { SystemInterface } from "../interfaces/system.interface";

export class SystemConnectionFactory {
  static generateConnection(system: ValidSystems): SystemInterface {
    const systems = {
      [ValidSystems.Chat]: ChatSystem,
      [ValidSystems.TicTacToe]: TicTacToeSystem,
    };

    return new systems[system]();
  }
}
