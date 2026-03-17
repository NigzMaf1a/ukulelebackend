"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePenaltyPayment = exports.updatePenaltyPayment = exports.getPenaltyPaymentData = exports.readPenaltyPayment = exports.createPenaltyPayment = void 0;
const penaltyPayment_1 = __importDefault(require("../models/penaltyPayment"));
// CREATE
const createPenaltyPayment = async (req, res) => {
    try {
        const payload = req.body;
        const penaltyPayment = new penaltyPayment_1.default();
        const result = await penaltyPayment.createPenaltyPayment(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create penalty payment",
            details: message
        });
    }
};
exports.createPenaltyPayment = createPenaltyPayment;
// READ ALL
const readPenaltyPayment = async (_req, res, next) => {
    try {
        const penaltyPayment = new penaltyPayment_1.default();
        const rows = await penaltyPayment.readPenaltyPayment();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readPenaltyPayment = readPenaltyPayment;
// READ SINGLE
const getPenaltyPaymentData = async (req, res) => {
    const id = Number(req.params.penaltyPaymentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid penaltyPaymentID" });
        return;
    }
    try {
        const penaltyPayment = new penaltyPayment_1.default();
        const row = await penaltyPayment.getPenaltyPaymentData(id);
        if (!row) {
            res.status(404).json({ error: "Penalty payment not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch penalty payment",
            details: message
        });
    }
};
exports.getPenaltyPaymentData = getPenaltyPaymentData;
// UPDATE
const updatePenaltyPayment = async (req, res) => {
    const id = Number(req.params.penaltyPaymentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid penaltyPaymentID" });
        return;
    }
    try {
        const payload = req.body;
        const penaltyPayment = new penaltyPayment_1.default();
        const result = await penaltyPayment.updatePenaltyPayment(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update penalty payment",
            details: message
        });
    }
};
exports.updatePenaltyPayment = updatePenaltyPayment;
// DELETE
const deletePenaltyPayment = async (req, res, next) => {
    const id = Number(req.params.penaltyPaymentID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid penaltyPaymentID" });
        return;
    }
    try {
        const penaltyPayment = new penaltyPayment_1.default();
        const result = await penaltyPayment.deletePenaltyPayment(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deletePenaltyPayment = deletePenaltyPayment;
