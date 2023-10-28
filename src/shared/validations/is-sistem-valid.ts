import { ValidSistems } from "../enums/valid-sistems.enum";

export function isSistemValid(system: string) {
  if (typeof system !== "string") return false;

  return Object.values(ValidSistems).includes(system as ValidSistems);
}
