"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFinance = exports.updateFinance = exports.getFinanceById = exports.getAllFinance = exports.createFinance = void 0;
const finance_1 = __importDefault(require("../models/finance"));
const createFinance = async (req, res) => {
    try {
        const payload = req.body;
        const financeModel = new finance_1.default();
        const result = await financeModel.createFinance(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create finance record",
            details: message
        });
    }
};
exports.createFinance = createFinance;
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
const getFinanceById = async (req, res) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (!Number.isInteger(transactionID)) {
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
        res.status(500).json({
            error: "Failed to fetch finance record",
            details: message
        });
    }
};
exports.getFinanceById = getFinanceById;
const updateFinance = async (req, res) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (!Number.isInteger(transactionID)) {
            res.status(400).json({ error: "Invalid transactionID" });
            return;
        }
        const financeModel = new finance_1.default();
        const result = await financeModel.updateFinance(transactionID);
        if (result.affectedRows === 0) {
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to approve payment",
            details: message
        });
    }
};
exports.updateFinance = updateFinance;
const deleteFinance = async (req, res, next) => {
    try {
        const transactionID = Number(req.params.transactionID);
        if (!Number.isInteger(transactionID)) {
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
