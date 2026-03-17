"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllocatedEquipment = exports.updateAllocatedEquipment = exports.getAllocatedEquipmentData = exports.readAllocatedEquipment = exports.createAllocatedEquipment = void 0;
const allocatedEquipment_1 = __importDefault(require("../models/allocatedEquipment"));
/**
 * CREATE Allocated Equipment
 */
const createAllocatedEquipment = async (req, res) => {
    try {
        const payload = req.body;
        const allocatedEquipment = new allocatedEquipment_1.default();
        const result = await allocatedEquipment.createAllocatedEquipment(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create allocated equipment",
            details: message
        });
    }
};
exports.createAllocatedEquipment = createAllocatedEquipment;
/**
 * READ ALL Allocated Equipment
 */
const readAllocatedEquipment = async (_req, res, next) => {
    try {
        const allocatedEquipment = new allocatedEquipment_1.default();
        const rows = await allocatedEquipment.readAllocatedEquipment();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readAllocatedEquipment = readAllocatedEquipment;
/**
 * GET SINGLE Allocated Equipment
 */
const getAllocatedEquipmentData = async (req, res) => {
    const id = Number(req.params.allocatedEquipmentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid allocatedEquipmentID" });
        return;
    }
    try {
        const allocatedEquipment = new allocatedEquipment_1.default();
        const row = await allocatedEquipment.getAllocatedEquipmentData(id);
        if (!row) {
            res.status(404).json({ error: "Allocated equipment not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch allocated equipment",
            details: message
        });
    }
};
exports.getAllocatedEquipmentData = getAllocatedEquipmentData;
/**
 * UPDATE Allocated Equipment
 */
const updateAllocatedEquipment = async (req, res) => {
    const id = Number(req.params.allocatedEquipmentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid allocatedEquipmentID" });
        return;
    }
    try {
        const payload = req.body;
        const allocatedEquipment = new allocatedEquipment_1.default();
        const result = await allocatedEquipment.updateAllocatedEquipment(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update allocated equipment",
            details: message
        });
    }
};
exports.updateAllocatedEquipment = updateAllocatedEquipment;
/**
 * DELETE Allocated Equipment
 */
const deleteAllocatedEquipment = async (req, res, next) => {
    const id = Number(req.params.allocatedEquipmentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid allocatedEquipmentID" });
        return;
    }
    try {
        const allocatedEquipment = new allocatedEquipment_1.default();
        const result = await allocatedEquipment.deleteAllocatedEquipment(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAllocatedEquipment = deleteAllocatedEquipment;
