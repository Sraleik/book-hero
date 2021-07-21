"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var jest_mock_extended_1 = require("jest-mock-extended");
var inversify_example_1 = require("../../inversify.example");
var example_class_1 = require("./example.class");
test("exemple test", function () {
    var exampleEntity = new example_class_1.Example("fake-key");
    expect(exampleEntity.sum(2, 1)).toBe(3);
});
test("inversify test", function () {
    var exampleKey = inversify_example_1.exampleContainer.get("ExampleKey");
    expect(exampleKey).toBe("fakeapikey");
});
test("exemple interface", function () {
    var example = jest_mock_extended_1.mock();
    example.behavior.mockImplementation(function (payload) {
        console.log(payload);
        return true;
    });
    expect(example.behavior({ osef: "lol" })).toBe(true);
});
