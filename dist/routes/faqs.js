"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faqs_1 = require("../controllers/faqs");
const router = express_1.default.Router();
router.post('/add', faqs_1.createFaq);
router.get('/get', faqs_1.readFaqs);
router.get('/get/:faqid', faqs_1.readFaq);
router.put('/update/:faqid', faqs_1.updateFaq);
router.put('/patch/:faqid', faqs_1.updateFaqState);
router.delete('/delete/:faqid', faqs_1.deleteFaq);
exports.default = router;
