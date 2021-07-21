import { EntityId } from "./entity-id";

export abstract class Entity {
  public readonly id: EntityId;

  constructor(id: EntityId) {
    this.id = id;
  }

  public equals(object?: Entity): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this.id.equals(object.id);
  }
}
