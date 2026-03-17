"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFinance = exports.updateFinance = exports.getFinanceById = exports.getAllFinance = exports.createFinance = void 0;
const finance_1 = __importDefault(require("../models/finance"));
/**
 * CREATE - Add a new finance transaction
 */
const createFinance = async (req, res) => {
    try {
        const payload = req.body;
        const financeModel = new finance_1.default();
        const result = await financeModel.createFinance(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create finance record", details: message });
    }
};
exports.createFinance = createFinance;
/**
 * READ - Get all finance transactions
 */
const getAllFinance = async (_req, res, next) => {
    try {
        const financeModel = new finance_1.default();
        const rows = await financeModel.readFinance();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllFinance = getAllFinance;
/**
 * READ - Get a single finance record by ID
 */
const getFinanceById = async (req, res) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (isNaN(transactionID)) {
            res.status(400).json({ error: "Invalid transactionID" });
            return;
        }
        const financeModel = new finance_1.default();
        const row = await financeModel.getFinanceData(transactionID);
        if (!row) {
            res.status(404).json({ error: "Finance record not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch finance record", details: message });
    }
};
exports.getFinanceById = getFinanceById;
/**
 * UPDATE - Edit an existing finance transaction
 */
const updateFinance = async (req, res) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (isNaN(transactionID)) {
            res.status(400).json({ error: "Invalid transactionID" });
            return;
        }
        const data = req.body;
        const financeModel = new finance_1.default();
        const result = await financeModel.updateFinance(transactionID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update finance record", details: message });
    }
};
exports.updateFinance = updateFinance;
/**
 * DELETE - Remove a finance transaction
 */
const deleteFinance = async (req, res, next) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (isNaN(transactionID)) {
            res.status(400).json({ error: "Invalid transactionID" });
            return;
        }
        const financeModel = new finance_1.default();
        const result = await financeModel.deleteFinance(transactionID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteFinance = deleteFinance;
