import { ChatSystem } from "../../modules/chat/chat.system";
import { ValidSystems } from "../enums/valid-systems.enum";
import { SystemInterface } from "../interfaces/system.interface";

export class SystemConnectionFactory {
  static generateConnection(system: ValidSystems): SystemInterface {
    const systems = {
      [ValidSystems.Chat]: ChatSystem,
    };

    return new systems[system]();
  }
}
