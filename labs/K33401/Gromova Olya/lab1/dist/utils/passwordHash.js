"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHash = void 0;
const crypto_1 = require("crypto");
function passwordHash(password) {
    return (0, crypto_1.createHash)('sha512').update(password).digest('base64').toString();
}
exports.passwordHash = passwordHash;
