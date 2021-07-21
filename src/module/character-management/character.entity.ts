import { AggregateRoot } from "../../core/aggregate-root";
import { EntityId } from "../../core/entity-id";
import { CharacterCreated } from "./character-created.event";
import { Name } from "./name.value-object";

type CharacterConstructorPayload = {
  id: EntityId;
  version?: number;
  creatorId?: EntityId;
  ownerId?: EntityId;
  firstName?: Name;
  lastName?: Name;
};

type CharacterCreatePayload = {
  creatorId: EntityId;
  firstName: Name;
  lastName: Name;
};

// TODO: ask yann about create/reconstitute and mandatory field in entity
// TODO: implement reconstitute
export class Character extends AggregateRoot {
  private _firstName?: Name;
  private _lastName?: Name;
  private _creatorId?: EntityId;
  private _ownerId?: EntityId;

  //TODO: Ask yann should event be stringify here or should they be stringify in the repository on save ?
  static create(payload: CharacterCreatePayload) {
    const character = new Character({
      id: EntityId.create(),
      ...payload,
      ownerId: payload.creatorId
    });

    character.addDomainEvent(
      CharacterCreated.create({
        characterId: character.id!,
        creatorId: character.creatorId!,
        firstName: character.firstName!,
        lastName: character.lastName!
      })
    );

    return character;
  }

  constructor(payload: CharacterConstructorPayload) {
    super({ id: payload.id, version: payload.version });
    this._firstName = payload.firstName;
    this._lastName = payload.lastName;
    this._creatorId = payload.creatorId;
    this._ownerId = payload.ownerId;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get creatorId() {
    return this._creatorId;
  }

  get ownerId() {
    return this._ownerId;
  }
}
