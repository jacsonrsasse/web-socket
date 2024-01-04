export class RoomsStorage {
  private _rooms!: Array<string>;

  addRoom(roomName: string) {
    this._rooms.push(roomName);
  }

  removeRoom(roomName: string) {
    this._rooms = this._rooms.splice(this._rooms.indexOf(roomName));
  }

  roomExists(roomName: string): boolean {
    return this._rooms.includes(roomName);
  }

  get rooms() {
    return this._rooms;
  }
}
