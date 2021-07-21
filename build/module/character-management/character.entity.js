"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var entity_id_1 = require("../../core/entity-id");
// TODO: ask yann about create/reconstitute and mandatory field in entity
// extend AgregateRoot
var Book = /** @class */ (function () {
    function Book(payload) {
        this._events = [];
        this._id = payload.id;
        this._ownerId = payload.ownerId;
        this._novelId = payload.novelId;
    }
    Book.create = function (payload) {
        return new Book(__assign(__assign({}, payload), { id: entity_id_1.EntityId.create() }));
    };
    Object.defineProperty(Book.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Book.prototype, "ownerId", {
        get: function () {
            return this._ownerId;
        },
        enumerable: false,
        configurable: true
    });
    //TODO: Ask yann should event be stringify here or should they be stringify in the repository on save ?
    //TODO: Create a BookStarted event
    Book.prototype.startBook = function (readerId) {
        this._events.push({
            eventType: "book-started",
            timeStamp: new Date(),
            data: {
                readerId: readerId,
                bookId: this._id,
                novelId: this._novelId,
                readingId: entity_id_1.EntityId.create()
            }
        });
    };
    return Book;
}());
exports.Book = Book;
