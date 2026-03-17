"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLending = exports.updateLending = exports.getLendingById = exports.getAllLending = exports.createLending = void 0;
const lending_1 = __importDefault(require("../models/lending"));
/**
 * CREATE - Add a new lending record
 */
const createLending = async (req, res) => {
    try {
        const payload = req.body;
        const lendingModel = new lending_1.default();
        const result = await lendingModel.createLending(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create lending record", details: message });
    }
};
exports.createLending = createLending;
/**
 * READ - Get all lending records
 */
const getAllLending = async (_req, res, next) => {
    try {
        const lendingModel = new lending_1.default();
        const rows = await lendingModel.getAllLending();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllLending = getAllLending;
/**
 * READ - Get a single lending record by ID
 */
const getLendingById = async (req, res) => {
    try {
        const lendID = Number(req.params.lendID);
        if (isNaN(lendID)) {
            res.status(400).json({ error: "Invalid lendID" });
            return;
        }
        const lendingModel = new lending_1.default();
        const row = await lendingModel.getLendingById(lendID);
        if (!row) {
            res.status(404).json({ error: "Lending record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch lending record", details: message });
    }
};
exports.getLendingById = getLendingById;
/**
 * UPDATE - Edit an existing lending record
 */
const updateLending = async (req, res) => {
    try {
        const lendID = Number(req.params.lendID);
        if (isNaN(lendID)) {
            res.status(400).json({ error: "Invalid lendID" });
            return;
        }
        const data = req.body;
        const lendingModel = new lending_1.default();
        const result = await lendingModel.updateLending(lendID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update lending record", details: message });
    }
};
exports.updateLending = updateLending;
/**
 * DELETE - Remove a lending record
 */
const deleteLending = async (req, res, next) => {
    try {
        const lendID = Number(req.params.lendID);
        if (isNaN(lendID)) {
            res.status(400).json({ error: "Invalid lendID" });
            return;
        }
        const lendingModel = new lending_1.default();
        const result = await lendingModel.deleteLending(lendID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteLending = deleteLending;
