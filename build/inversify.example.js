"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleContainer = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
var inversify_1 = require("inversify");
var dotenv_1 = require("dotenv");
dotenv_1.config({ path: __dirname + "/../.env" });
var exampleContainer = new inversify_1.Container();
exports.exampleContainer = exampleContainer;
var exampleKey = process.env.EXAMPLE_KEY || "fake";
exampleContainer.bind("ExampleKey").toConstantValue(exampleKey);
