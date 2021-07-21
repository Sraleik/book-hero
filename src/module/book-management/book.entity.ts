import { AggregateRoot } from "../../core/aggregate-root";
import { EntityId } from "../../core/entity-id";
import { BookStarted } from "./book-started.event";

type BookConstructorPayload = {
  id: EntityId;
  version?: number;
  ownerId?: EntityId;
  novelId?: EntityId;
};

type BookCreatePayload = {
  ownerId: EntityId;
  novelId: EntityId;
};

// TODO: ask yann about create/reconstitute and mandatory field in entity
// TODO: implement reconstiture
// This book represent a book own by a user. It is not the author work !
// extend AgregateRoot
export class Book extends AggregateRoot {
  private _ownerId?: EntityId;
  public readonly novelId?: EntityId;
  private _events: Array<Record<string, any>> = [];

  static create(payload: BookCreatePayload) {
    return new Book({ ...payload, id: EntityId.create() });
  }

  constructor(payload: BookConstructorPayload) {
    super({ id: payload.id, version: payload.version });
    this._ownerId = payload.ownerId;
    this.novelId = payload.novelId;
  }

  get ownerId() {
    return this._ownerId;
  }

  //TODO: Ask yann should event be stringify here or should they be stringify in the repository on save ?
  startBook(readerId: EntityId) {
    this.addDomainEvent(
      BookStarted.create({
        readingId: EntityId.create(),
        readerId,
        bookId: this.id,
        novelId: this.novelId!
      })
    );
  }
}
