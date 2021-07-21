import "reflect-metadata";
import { mock as mockInterface } from "jest-mock-extended";
import { exampleContainer } from "../../inversify.example";

import { Example } from "./example.class";
import { Example as IExample } from "./example.interface";

test("exemple test", () => {
  const exampleEntity = new Example("fake-key");

  expect(exampleEntity.sum(2, 1)).toBe(3);
});

test("inversify test", () => {
  const exampleKey = exampleContainer.get("ExampleKey");

  expect(exampleKey).toBe("fakeapikey");
});

test("exemple interface", () => {
  const example = mockInterface<IExample>();
  example.behavior.mockImplementation((payload: Record<string, any>) => {
    console.log(payload);
    return true;
  });

  expect(example.behavior({ osef: "lol" })).toBe(true);
});
