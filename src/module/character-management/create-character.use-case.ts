import { inject, injectable } from "inversify";
import { EntityId } from "../../core/entity-id";
import { CharacterRepository } from "./character-repo.interface";
import { Character } from "./character.entity";
import { Name } from "./name.value-object";

//TODO: find a better place for those types
export type CreateCharacterDTO = {
  creatorId: EntityId;
  firstName: Name;
  lastName: Name;
};

@injectable()
export class CreateCharacter {
  constructor(
    @inject("characterRepository")
    public characterRepository: CharacterRepository
  ) {}

  async execute(payload: CreateCharacterDTO) {
    this.characterRepository.save(Character.create(payload));
  }
}
