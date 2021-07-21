/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from "./entity";
import { DomainEvent } from "./domain-event";
import { EntityId } from "./entity-id";

export type AggregateRootPayload = {
  id: EntityId;
  version?: number;
};

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent[] = [];
  protected _currentVersion = 0;

  constructor(payload: AggregateRootPayload) {
    super(payload.id);
    // TODO rename to version => it's version everywhere !!
    this._currentVersion = payload.version || 0;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  get currentVersion() {
    return this._currentVersion;
  }

  set currentVersion(version: number) {
    if (version > this._currentVersion) {
      this._currentVersion = version;
    }
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
