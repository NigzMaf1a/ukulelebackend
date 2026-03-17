"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePenalty = exports.updatePenalty = exports.getPenaltyById = exports.getAllPenalties = exports.createPenalty = void 0;
const penalty_1 = __importDefault(require("../models/penalty"));
/**
 * CREATE - Add a new penalty
 */
const createPenalty = async (req, res) => {
    try {
        const data = req.body;
        const penaltyModel = new penalty_1.default();
        const result = await penaltyModel.createPenalty(data);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create penalty", details: message });
    }
};
exports.createPenalty = createPenalty;
/**
 * READ - Get all penalties
 */
const getAllPenalties = async (_req, res, next) => {
    try {
        const penaltyModel = new penalty_1.default();
        const rows = await penaltyModel.readPenalties();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllPenalties = getAllPenalties;
/**
 * READ - Get a single penalty by ID
 */
const getPenaltyById = async (req, res) => {
    try {
        const penaltyID = Number(req.params.penaltyID);
        if (isNaN(penaltyID)) {
            res.status(400).json({ error: "Invalid penaltyID" });
            return;
        }
        const penaltyModel = new penalty_1.default();
        const row = await penaltyModel.getPenaltyData(penaltyID);
        if (!row) {
            res.status(404).json({ error: "Penalty not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch penalty", details: message });
    }
};
exports.getPenaltyById = getPenaltyById;
/**
 * UPDATE - Update a penalty record
 */
const updatePenalty = async (req, res) => {
    try {
        const penaltyID = Number(req.params.penaltyID);
        if (isNaN(penaltyID)) {
            res.status(400).json({ error: "Invalid penaltyID" });
            return;
        }
        const data = req.body;
        const penaltyModel = new penalty_1.default();
        const result = await penaltyModel.updatePenalty(penaltyID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update penalty", details: message });
    }
};
exports.updatePenalty = updatePenalty;
/**
 * DELETE - Remove a penalty record
 */
const deletePenalty = async (req, res, next) => {
    try {
        const penaltyID = Number(req.params.penaltyID);
        if (isNaN(penaltyID)) {
            res.status(400).json({ error: "Invalid penaltyID" });
            return;
        }
        const penaltyModel = new penalty_1.default();
        const result = await penaltyModel.deletePenalty(penaltyID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deletePenalty = deletePenalty;
