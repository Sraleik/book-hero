/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from "./aggregate-root";
import { EntityId } from "./entity-id";

export abstract class DomainEvent {
  public readonly id: EntityId;
  public readonly timestamp: Date;
  public abstract readonly type: string;
  protected data: Record<string, any> = {};

  //This might be a leek from serialized. Because I know expected version must be 'version +1'
  // But it might depend on the event store !! Some may accept 'version'
  // static getExpectedVersion(aggregate: AggregateRoot) {
  //   if (aggregate.domainEvents.length === 0) {
  //     return aggregate.currentVersion + 1;
  //   } else {
  //     const domainEventsLastIndex = aggregate.domainEvents.length - 1;
  //     const expectedVersion =
  //       aggregate.domainEvents[domainEventsLastIndex].version + 1;
  //     return expectedVersion;
  //   }
  // }Ò

  constructor() {
    this.id = EntityId.create();
    this.timestamp = new Date();
  }

  public abstract getAggregateId(): EntityId;
}
