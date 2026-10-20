"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllocatedEquipment = exports.patchAllocatedEquipment = exports.getAllocatedEquipmentById = exports.getAllAllocatedEquipment = exports.createAllocatedEquipment = void 0;
const allocatedequipment_1 = __importDefault(require("../models/allocatedequipment"));
const createAllocatedEquipment = async (req, res) => {
    try {
        const payload = req.body;
        const model = new allocatedequipment_1.default();
        const result = await model.createAllocatedEquipment(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (message === "Equipment is unavailable or does not exist") {
            res.status(409).json({ error: message });
            return;
        }
        res.status(500).json({
            error: "Failed to create equipment allocation",
            details: message
        });
    }
};
exports.createAllocatedEquipment = createAllocatedEquipment;
const getAllAllocatedEquipment = async (_req, res, next) => {
    try {
        const model = new allocatedequipment_1.default();
        const rows = await model.readAllocatedEquipment();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllAllocatedEquipment = getAllAllocatedEquipment;
const getAllocatedEquipmentById = async (req, res) => {
    try {
        const allocEquipID = Number(req.params.allocEquipID);
        if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
            res.status(400).json({ error: "Invalid allocEquipID" });
            return;
        }
        const model = new allocatedequipment_1.default();
        const row = await model.getAllocatedEquipmentData(allocEquipID);
        if (!row) {
            res.status(404).json({ error: "Equipment allocation not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch equipment allocation",
            details: message
        });
    }
};
exports.getAllocatedEquipmentById = getAllocatedEquipmentById;
const patchAllocatedEquipment = async (req, res) => {
    try {
        const allocEquipID = Number(req.params.allocEquipID);
        if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
            res.status(400).json({ error: "Invalid allocEquipID" });
            return;
        }
        const payload = req.body;
        const model = new allocatedequipment_1.default();
        const result = await model.patchAllocatedEquipment(allocEquipID, payload);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Equipment allocation not found" });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update equipment allocation",
            details: message
        });
    }
};
exports.patchAllocatedEquipment = patchAllocatedEquipment;
const deleteAllocatedEquipment = async (req, res, next) => {
    try {
        const allocEquipID = Number(req.params.allocEquipID);
        if (!Number.isInteger(allocEquipID) || allocEquipID <= 0) {
            res.status(400).json({ error: "Invalid allocEquipID" });
            return;
        }
        const model = new allocatedequipment_1.default();
        const result = await model.deleteAllocatedEquipment(allocEquipID);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Equipment allocation not found" });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAllocatedEquipment = deleteAllocatedEquipment;
