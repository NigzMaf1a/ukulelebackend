"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInspector = exports.updateInspector = exports.getInspectorById = exports.getAllInspectors = exports.createInspector = void 0;
const inspector_1 = __importDefault(require("../models/inspector"));
/**
 * CREATE - Add a new inspection record
 */
const createInspector = async (req, res) => {
    try {
        const payload = req.body;
        const inspectorModel = new inspector_1.default();
        const result = await inspectorModel.createInspector(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create inspection", details: message });
    }
};
exports.createInspector = createInspector;
/**
 * READ - Get all inspection records
 */
const getAllInspectors = async (_req, res, next) => {
    try {
        const inspectorModel = new inspector_1.default();
        const rows = await inspectorModel.readInspectors();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllInspectors = getAllInspectors;
/**
 * READ - Get a single inspection record by ID
 */
const getInspectorById = async (req, res) => {
    try {
        const inspectionID = Number(req.params.inspectionID);
        if (isNaN(inspectionID)) {
            res.status(400).json({ error: "Invalid inspectionID" });
            return;
        }
        const inspectorModel = new inspector_1.default();
        const row = await inspectorModel.getInspectorData(inspectionID);
        if (!row) {
            res.status(404).json({ error: "Inspection record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch inspection record", details: message });
    }
};
exports.getInspectorById = getInspectorById;
/**
 * UPDATE - Edit an existing inspection record
 */
const updateInspector = async (req, res) => {
    try {
        const inspectionID = Number(req.params.inspectionID);
        if (isNaN(inspectionID)) {
            res.status(400).json({ error: "Invalid inspectionID" });
            return;
        }
        const data = req.body;
        const inspectorModel = new inspector_1.default();
        const result = await inspectorModel.updateInspector(inspectionID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update inspection", details: message });
    }
};
exports.updateInspector = updateInspector;
/**
 * DELETE - Remove an inspection record
 */
const deleteInspector = async (req, res, next) => {
    try {
        const inspectionID = Number(req.params.inspectionID);
        if (isNaN(inspectionID)) {
            res.status(400).json({ error: "Invalid inspectionID" });
            return;
        }
        const inspectorModel = new inspector_1.default();
        const result = await inspectorModel.deleteInspector(inspectionID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteInspector = deleteInspector;
