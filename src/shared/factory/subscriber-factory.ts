import { ChatSystem } from "../../modules/chat/chat.system";
import { ValidSistems } from "../enums/valid-sistems.enum";
import { SystemInterface } from "../interfaces/system.interface";

export class SubscriberFactory {
  static getSubscriber(system: ValidSistems): SystemInterface {
    const systems = {
      [ValidSistems.Chat]: ChatSystem,
    };

    return new systems[system]();
  }
}
