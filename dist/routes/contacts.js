"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../controllers/contacts");
const router = express_1.default.Router();
router.post('/add', contacts_1.upsertContact);
router.delete('/delete/:ContactID', contacts_1.deleteContact);
router.get('/get', contacts_1.readContact);
exports.default = router;
