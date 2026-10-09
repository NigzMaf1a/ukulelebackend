"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaqState = exports.updateFaq = exports.readFaq = exports.readFaqs = exports.createFaq = void 0;
const faqs_1 = __importDefault(require("../models/faqs"));
const faqs = new faqs_1.default();
const createFaq = async (req, res) => {
    const faq = req.body;
    try {
        const result = await faqs.createFaq(faq);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to create FAQ',
            details: message
        });
    }
};
exports.createFaq = createFaq;
const readFaqs = async (req, res) => {
    try {
        const rows = await faqs.readFaqs();
        res.status(200).json(rows);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to fetch FAQs',
            details: message
        });
    }
};
exports.readFaqs = readFaqs;
const readFaq = async (req, res) => {
    const faqid = Number(req.params.faqid);
    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' });
        return;
    }
    try {
        const row = await faqs.readFaq(faqid);
        if (!row) {
            res.status(404).json({ message: 'FAQ not found' });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to fetch FAQ',
            details: message
        });
    }
};
exports.readFaq = readFaq;
const updateFaq = async (req, res) => {
    const faqid = Number(req.params.faqid);
    const faq = req.body;
    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' });
        return;
    }
    try {
        const result = await faqs.updateFaq(faqid, faq);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to update FAQ',
            details: message
        });
    }
};
exports.updateFaq = updateFaq;
const updateFaqState = async (req, res) => {
    const faqid = Number(req.params.faqid);
    const { approved } = req.body;
    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' });
        return;
    }
    if (approved !== 'Yes' && approved !== 'No') {
        res.status(400).json({
            message: "The approved field must be either 'Yes' or 'No'"
        });
        return;
    }
    try {
        const result = await faqs.updateFaqState(faqid, approved);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to update FAQ approval status',
            details: message
        });
    }
};
exports.updateFaqState = updateFaqState;
const deleteFaq = async (req, res) => {
    const faqid = Number(req.params.faqid);
    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' });
        return;
    }
    try {
        const result = await faqs.deleteFaq(faqid);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error';
        res.status(500).json({
            error: 'Failed to delete FAQ',
            details: message
        });
    }
};
exports.deleteFaq = deleteFaq;
