/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { Container } from "inversify";
import { config } from "dotenv";

config({ path: __dirname + "/../.env" });

const exampleContainer = new Container();
const exampleKey = process.env.EXAMPLE_KEY || "fake";

exampleContainer.bind<String>("ExampleKey").toConstantValue(exampleKey);

/*
exampleContainer
  .bind<ExampleInterface>("ExampleClassName")
  .to(ExempleClassImplementingInterface);
  .inSingletonScope();

// this is for subscription to be registered, 
exampleContainer.resolve(SubscriptionExample);
*/

export { exampleContainer };
