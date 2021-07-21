import { Character } from "./character.entity";

export interface CharacterRepository {
  save(character: Character): Promise<string>;
}
