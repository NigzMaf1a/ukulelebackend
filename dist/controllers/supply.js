"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupply = exports.updateSupply = exports.getSupplyById = exports.getAllSupplies = exports.createSupply = void 0;
const supply_1 = __importDefault(require("../models/supply"));
/**
 * CREATE - Add a new supply record
 */
const createSupply = async (req, res) => {
    try {
        const data = req.body;
        const supplyModel = new supply_1.default();
        const result = await supplyModel.createSupply(data);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create supply", details: message });
    }
};
exports.createSupply = createSupply;
/**
 * READ - Get all supply records
 */
const getAllSupplies = async (_req, res, next) => {
    try {
        const supplyModel = new supply_1.default();
        const rows = await supplyModel.readSupplies();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllSupplies = getAllSupplies;
/**
 * READ - Get a single supply record by ID
 */
const getSupplyById = async (req, res) => {
    try {
        const supplyID = Number(req.params.supplyID);
        if (isNaN(supplyID)) {
            res.status(400).json({ error: "Invalid supplyID" });
            return;
        }
        const supplyModel = new supply_1.default();
        const row = await supplyModel.getSupplyData(supplyID);
        if (!row) {
            res.status(404).json({ error: "Supply record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch supply record", details: message });
    }
};
exports.getSupplyById = getSupplyById;
/**
 * UPDATE - Update an existing supply record
 */
const updateSupply = async (req, res) => {
    try {
        const supplyID = Number(req.params.supplyID);
        if (isNaN(supplyID)) {
            res.status(400).json({ error: "Invalid supplyID" });
            return;
        }
        const data = req.body;
        const supplyModel = new supply_1.default();
        const result = await supplyModel.updateSupply(supplyID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update supply record", details: message });
    }
};
exports.updateSupply = updateSupply;
/**
 * DELETE - Remove a supply record
 */
const deleteSupply = async (req, res, next) => {
    try {
        const supplyID = Number(req.params.supplyID);
        if (isNaN(supplyID)) {
            res.status(400).json({ error: "Invalid supplyID" });
            return;
        }
        const supplyModel = new supply_1.default();
        const result = await supplyModel.deleteSupply(supplyID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteSupply = deleteSupply;
