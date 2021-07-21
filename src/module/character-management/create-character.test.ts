import "reflect-metadata";
import { mock as mockInterface } from "jest-mock-extended";

import { EntityId } from "../../core/entity-id";
import {
  CreateCharacter,
  CreateCharacterDTO
} from "./create-character.use-case";
import { CharacterRepository } from "./character-repo.interface";
import { Name } from "./name.value-object";

//when: user ask to create a character
//given: that user give all the required parameters
//then: the character is started
test("create a character", async () => {
  const characterRepository = mockInterface<CharacterRepository>();
  const createCharacter = new CreateCharacter(characterRepository);

  const createCharacterDTO: CreateCharacterDTO = {
    creatorId: EntityId.create(),
    firstName: Name.create("Sraleik"),
    lastName: Name.create("Mandrake")
  };

  await createCharacter.execute(createCharacterDTO);

  expect(characterRepository.save).toHaveBeenCalledWith(
    expect.objectContaining({
      _domainEvents: expect.arrayContaining([
        expect.objectContaining({
          type: "character-created",
          data: expect.objectContaining({
            creatorId: createCharacterDTO.creatorId,
            firstName: Name.create("Sraleik"),
            lastName: Name.create("Mandrake")
          })
        })
      ])
    })
  );
});
