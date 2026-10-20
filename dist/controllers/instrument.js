"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstrument = exports.updateInstrument = exports.getInstrumentById = exports.getAllInstruments = exports.createInstrument = void 0;
const instruments_1 = __importDefault(require("../models/instruments"));
const createInstrument = async (req, res) => {
    try {
        const payload = req.body;
        const instrumentModel = new instruments_1.default();
        const result = await instrumentModel.createInstrument(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create instrument",
            details: message
        });
    }
};
exports.createInstrument = createInstrument;
const getAllInstruments = async (_req, res, next) => {
    try {
        const instrumentModel = new instruments_1.default();
        const rows = await instrumentModel.readInstruments();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllInstruments = getAllInstruments;
const getInstrumentById = async (req, res) => {
    try {
        const instrumentID = Number(req.params.instrumentID);
        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" });
            return;
        }
        const instrumentModel = new instruments_1.default();
        const row = await instrumentModel.getInstrumentData(instrumentID);
        if (!row) {
            res.status(404).json({ error: "Instrument record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch instrument record",
            details: message
        });
    }
};
exports.getInstrumentById = getInstrumentById;
const updateInstrument = async (req, res) => {
    try {
        const instrumentID = Number(req.params.instrumentID);
        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" });
            return;
        }
        const data = req.body;
        const instrumentModel = new instruments_1.default();
        const result = await instrumentModel.updateInstrument(instrumentID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update instrument",
            details: message
        });
    }
};
exports.updateInstrument = updateInstrument;
const deleteInstrument = async (_req, res, next) => {
    try {
        const instrumentID = Number(_req.params.instrumentID);
        if (!Number.isInteger(instrumentID) || instrumentID <= 0) {
            res.status(400).json({ error: "Invalid instrumentID" });
            return;
        }
        const instrumentModel = new instruments_1.default();
        const result = await instrumentModel.deleteInstrument(instrumentID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteInstrument = deleteInstrument;
