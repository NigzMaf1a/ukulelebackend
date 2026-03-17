"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDispatch = exports.updateDispatch = exports.getDispatchById = exports.getAllDispatches = exports.createDispatch = void 0;
const dispatch_1 = __importDefault(require("../models/dispatch"));
/**
 * CREATE - Add a new dispatch
 */
const createDispatch = async (req, res) => {
    try {
        const payload = req.body;
        const dispatchModel = new dispatch_1.default();
        const result = await dispatchModel.createDispatch(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create dispatch", details: message });
    }
};
exports.createDispatch = createDispatch;
/**
 * READ - Get all dispatches
 */
const getAllDispatches = async (_req, res, next) => {
    try {
        const dispatchModel = new dispatch_1.default();
        const rows = await dispatchModel.getAllDispatches();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllDispatches = getAllDispatches;
/**
 * READ - Get a single dispatch by ID
 */
const getDispatchById = async (req, res) => {
    try {
        const dispatchID = Number(req.params.dispatchID);
        if (isNaN(dispatchID)) {
            res.status(400).json({ error: "Invalid dispatchID" });
            return;
        }
        const dispatchModel = new dispatch_1.default();
        const row = await dispatchModel.getDispatchById(dispatchID);
        if (!row) {
            res.status(404).json({ error: "Dispatch not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch dispatch", details: message });
    }
};
exports.getDispatchById = getDispatchById;
/**
 * UPDATE - Edit an existing dispatch
 */
const updateDispatch = async (req, res) => {
    try {
        const dispatchID = Number(req.params.dispatchID);
        if (isNaN(dispatchID)) {
            res.status(400).json({ error: "Invalid dispatchID" });
            return;
        }
        const data = req.body;
        const dispatchModel = new dispatch_1.default();
        const result = await dispatchModel.updateDispatch(dispatchID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update dispatch", details: message });
    }
};
exports.updateDispatch = updateDispatch;
/**
 * DELETE - Remove a dispatch record
 */
const deleteDispatch = async (req, res, next) => {
    try {
        const dispatchID = Number(req.params.dispatchID);
        if (isNaN(dispatchID)) {
            res.status(400).json({ error: "Invalid dispatchID" });
            return;
        }
        const dispatchModel = new dispatch_1.default();
        const result = await dispatchModel.deleteDispatch(dispatchID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteDispatch = deleteDispatch;
