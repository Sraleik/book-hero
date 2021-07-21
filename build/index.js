"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
//create a server object:
http_1.default
    .createServer(function (req, res) {
    res.write("Hello !"); //write a response to the client
    res.end(); //end the response
})
    .listen(8080); //the server object listens on port 8080
