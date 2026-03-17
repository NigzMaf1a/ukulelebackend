"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'No token, access denied' });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error('Missing JWT secret');
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ error: 'Invalid token', detail: err.message });
    }
}
exports.default = authMiddleware;
