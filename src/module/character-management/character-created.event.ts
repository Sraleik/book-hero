import { DomainEvent } from "../../core/domain-event";
import { EntityId } from "../../core/entity-id";
import { Name } from "./name.value-object";

export type CharacterCreatedPayload = {
  characterId: EntityId;
  creatorId: EntityId;
  firstName: Name;
  lastName: Name;
};

export class CharacterCreated extends DomainEvent {
  type = "character-created";

  static create(data: CharacterCreatedPayload) {
    return new CharacterCreated(data);
  }

  private constructor(data: CharacterCreatedPayload) {
    super();
    this.data = data;
  }

  public getAggregateId(): EntityId {
    return this.data.characterId;
  }
}
