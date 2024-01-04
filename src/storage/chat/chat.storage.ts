import { RoomsStorage } from "@storage/rooms/rooms.storage";
import { Service } from "typedi";

@Service()
export class ChatStorage extends RoomsStorage {
  private _users: Map<string, Array<string>> = new Map();

  public addUser(userId: string) {
    this._users.set(userId, []);
  }

  public removeUser(userId: string) {
    this._users.delete(userId);
  }

  public joinRoom(userId: string, room: string) {
    if (!this._users.has(userId)) return;

    const rooms = this._users.get(userId) ?? [];
    rooms.push(room);

    this._users.set(userId, rooms);
  }

  public exitRoom(userId: string, room: string) {
    if (!this._users.has(userId)) return;

    let rooms = this._users.get(userId) ?? [];
    rooms = rooms.splice(rooms.indexOf(room));

    this._users.set(userId, rooms);
  }
}
