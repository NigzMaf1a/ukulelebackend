"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.getInventoryById = exports.getAllInventory = exports.createInventory = void 0;
const inventory_1 = __importDefault(require("../models/inventory"));
/**
 * CREATE - Add a new inventory record
 */
const createInventory = async (req, res) => {
    try {
        const payload = req.body;
        const inventoryModel = new inventory_1.default();
        const result = await inventoryModel.createInventory(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create inventory", details: message });
    }
};
exports.createInventory = createInventory;
/**
 * READ - Get all inventory records
 */
const getAllInventory = async (_req, res, next) => {
    try {
        const inventoryModel = new inventory_1.default();
        const rows = await inventoryModel.readInventory();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllInventory = getAllInventory;
/**
 * READ - Get a single inventory record by EquipmentID
 */
const getInventoryById = async (req, res) => {
    try {
        const equipmentID = Number(req.params.equipmentID);
        if (isNaN(equipmentID)) {
            res.status(400).json({ error: "Invalid equipmentID" });
            return;
        }
        const inventoryModel = new inventory_1.default();
        const row = await inventoryModel.getInventoryData(equipmentID);
        if (!row) {
            res.status(404).json({ error: "Inventory record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch inventory record", details: message });
    }
};
exports.getInventoryById = getInventoryById;
/**
 * UPDATE - Edit an existing inventory record
 */
const updateInventory = async (req, res) => {
    try {
        const equipmentID = Number(req.params.equipmentID);
        if (isNaN(equipmentID)) {
            res.status(400).json({ error: "Invalid equipmentID" });
            return;
        }
        const data = req.body;
        const inventoryModel = new inventory_1.default();
        const result = await inventoryModel.updateInventory(equipmentID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update inventory", details: message });
    }
};
exports.updateInventory = updateInventory;
/**
 * DELETE - Remove an inventory record
 */
const deleteInventory = async (req, res, next) => {
    try {
        const equipmentID = Number(req.params.equipmentID);
        if (isNaN(equipmentID)) {
            res.status(400).json({ error: "Invalid equipmentID" });
            return;
        }
        const inventoryModel = new inventory_1.default();
        const result = await inventoryModel.deleteInventory(equipmentID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteInventory = deleteInventory;
