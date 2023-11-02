import { ValidSystems } from "../enums/valid-systems.enum";

export function isSystemValid(system: string) {
  if (typeof system !== "string") return false;

  return Object.values(ValidSystems).includes(system as ValidSystems);
}
