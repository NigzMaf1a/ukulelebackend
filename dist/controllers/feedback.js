"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.updateFeedback = exports.getFeedbackData = exports.readFeedback = exports.createFeedback = void 0;
const feedback_1 = __importDefault(require("../models/feedback"));
const createFeedback = async (req, res) => {
    try {
        const payload = req.body;
        const feedback = new feedback_1.default();
        const result = await feedback.createFeedback(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create feedback", details: message });
    }
};
exports.createFeedback = createFeedback;
const readFeedback = async (_req, res, next) => {
    try {
        const feedback = new feedback_1.default();
        const rows = await feedback.readFeedback();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readFeedback = readFeedback;
const getFeedbackData = async (req, res) => {
    const id = Number(req.params.feedbackID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid feedbackID" });
        return;
    }
    try {
        const feedback = new feedback_1.default();
        const row = await feedback.getFeedbackData(id);
        if (!row) {
            res.status(404).json({ error: "Feedback not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch feedback", details: message });
    }
};
exports.getFeedbackData = getFeedbackData;
const updateFeedback = async (req, res) => {
    const id = Number(req.params.feedbackID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid feedbackID" });
        return;
    }
    try {
        const payload = req.body;
        const feedback = new feedback_1.default();
        const result = await feedback.updateFeedback(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update feedback", details: message });
    }
};
exports.updateFeedback = updateFeedback;
const deleteFeedback = async (req, res, next) => {
    const id = Number(req.params.feedbackID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid feedbackID" });
        return;
    }
    try {
        const feedback = new feedback_1.default();
        const result = await feedback.deleteFeedback(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteFeedback = deleteFeedback;
