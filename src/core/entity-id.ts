import { v4 as uuid } from "uuid";

export class EntityId {
  static create() {
    return new EntityId(uuid());
  }

  constructor(private _id?: string) {}

  equals(id?: EntityId): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    return id.toString() === this._id;
  }

  toString(): string {
    return String(this._id);
  }
}
