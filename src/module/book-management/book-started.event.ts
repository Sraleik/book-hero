import { DomainEvent } from "../../core/domain-event";
import { EntityId } from "../../core/entity-id";

export type BookStartedPayload = {
  readingId: EntityId;
  readerId: EntityId;
  bookId: EntityId;
  novelId: EntityId;
};

export class BookStarted extends DomainEvent {
  type = "book-started";

  static create(data: BookStartedPayload) {
    return new BookStarted(data);
  }

  private constructor(data: BookStartedPayload) {
    super();
    this.data = data;
  }

  public getAggregateId(): EntityId {
    return this.data.readingId;
  }
}
