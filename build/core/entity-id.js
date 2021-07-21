"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
var uuid_1 = require("uuid");
var EntityId = /** @class */ (function () {
    function EntityId(_id) {
        this._id = _id;
    }
    EntityId.create = function () {
        return new EntityId(uuid_1.v4());
    };
    EntityId.prototype.equals = function (id) {
        if (id === null || id === undefined) {
            return false;
        }
        return id.toString() === this._id;
    };
    EntityId.prototype.toString = function () {
        return String(this._id);
    };
    return EntityId;
}());
exports.EntityId = EntityId;
