"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllocatedInstrument = exports.patchAllocatedInstrument = exports.getAllocatedInstrumentById = exports.getAllAllocatedInstruments = exports.createAllocatedInstrument = void 0;
const allocatedinstrument_1 = __importDefault(require("../models/allocatedinstrument"));
const createAllocatedInstrument = async (req, res) => {
    try {
        const payload = req.body;
        const model = new allocatedinstrument_1.default();
        const result = await model.createAllocatedInstrument(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (message === "Instrument is unavailable or does not exist") {
            res.status(409).json({ error: message });
            return;
        }
        res.status(500).json({
            error: "Failed to create instrument allocation",
            details: message
        });
    }
};
exports.createAllocatedInstrument = createAllocatedInstrument;
const getAllAllocatedInstruments = async (_req, res, next) => {
    try {
        const model = new allocatedinstrument_1.default();
        const rows = await model.readAllocatedInstruments();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllAllocatedInstruments = getAllAllocatedInstruments;
const getAllocatedInstrumentById = async (req, res) => {
    try {
        const allocInstID = Number(req.params.allocInstID);
        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" });
            return;
        }
        const model = new allocatedinstrument_1.default();
        const row = await model.getAllocatedInstrumentData(allocInstID);
        if (!row) {
            res.status(404).json({ error: "Instrument allocation not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch instrument allocation",
            details: message
        });
    }
};
exports.getAllocatedInstrumentById = getAllocatedInstrumentById;
const patchAllocatedInstrument = async (req, res) => {
    try {
        const allocInstID = Number(req.params.allocInstID);
        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" });
            return;
        }
        const payload = req.body;
        const model = new allocatedinstrument_1.default();
        const result = await model.patchAllocatedInstrument(allocInstID, payload);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Instrument allocation not found" });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update instrument allocation",
            details: message
        });
    }
};
exports.patchAllocatedInstrument = patchAllocatedInstrument;
const deleteAllocatedInstrument = async (req, res, next) => {
    try {
        const allocInstID = Number(req.params.allocInstID);
        if (!Number.isInteger(allocInstID) || allocInstID <= 0) {
            res.status(400).json({ error: "Invalid allocInstID" });
            return;
        }
        const model = new allocatedinstrument_1.default();
        const result = await model.deleteAllocatedInstrument(allocInstID);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Instrument allocation not found" });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAllocatedInstrument = deleteAllocatedInstrument;
