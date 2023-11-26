import { ChatSystem } from "../../modules/chat/chat.system";
import { TicTacToeStorage } from "../../modules/tic-tac-toe/storage/tic-tac-toe.storage";
import TicTacToeSystem from "../../modules/tic-tac-toe/tic-tac-toe.system";
import { DefineAsServerUseCase } from "../../modules/tic-tac-toe/use-cases/define-as-server-use-case/define-as-server.usecase";
import { ValidSystems } from "../enums/valid-systems.enum";

type SystemFactoryDependency = {
  classReference: any;
  dependencies?: SystemFactoryDependency[];
};

type Systems = {
  [name: string]: SystemFactoryDependency;
};

export class SystemFactory {
  static createSystem(system: ValidSystems) {
    const systems: Systems = {
      [ValidSystems.Chat]: {
        classReference: ChatSystem,
      },
      [ValidSystems.TicTacToe]: {
        classReference: TicTacToeSystem,
        dependencies: [
          {
            classReference: DefineAsServerUseCase,
            dependencies: [{ classReference: TicTacToeStorage }],
          },
        ],
      },
    };

    const { classReference, dependencies } = systems[system];
    const resolvedDependencies = dependencies
      ? SystemFactory.resolveDependencies(dependencies)
      : [];

    return new classReference(...resolvedDependencies);
  }

  static resolveDependencies(systemDependencies: SystemFactoryDependency[]) {
    let resolvedDependencies: any[] = [];
    for (const { classReference, dependencies } of systemDependencies) {
      if (dependencies) {
        resolvedDependencies = SystemFactory.resolveDependencies(dependencies);
      }

      resolvedDependencies.push(new classReference(...resolvedDependencies));
    }

    return resolvedDependencies;
  }
}
