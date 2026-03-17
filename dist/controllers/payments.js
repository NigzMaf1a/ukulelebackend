"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.getPaymentById = exports.getAllPayments = exports.createPayment = void 0;
const payment_1 = __importDefault(require("../models/payment"));
/**
 * CREATE - Add a new payment
 */
const createPayment = async (req, res) => {
    try {
        const data = req.body;
        const paymentModel = new payment_1.default();
        const result = await paymentModel.createPayment(data);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create payment", details: message });
    }
};
exports.createPayment = createPayment;
/**
 * READ - Get all payments
 */
const getAllPayments = async (_req, res, next) => {
    try {
        const paymentModel = new payment_1.default();
        const rows = await paymentModel.readPayments();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllPayments = getAllPayments;
/**
 * READ - Get a single payment by ID
 */
const getPaymentById = async (req, res) => {
    try {
        const processID = Number(req.params.processID);
        if (isNaN(processID)) {
            res.status(400).json({ error: "Invalid processID" });
            return;
        }
        const paymentModel = new payment_1.default();
        const row = await paymentModel.getPaymentData(processID);
        if (!row) {
            res.status(404).json({ error: "Payment not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch payment", details: message });
    }
};
exports.getPaymentById = getPaymentById;
/**
 * UPDATE - Update a payment record
 */
const updatePayment = async (req, res) => {
    try {
        const processID = Number(req.params.processID);
        if (isNaN(processID)) {
            res.status(400).json({ error: "Invalid processID" });
            return;
        }
        const data = req.body;
        const paymentModel = new payment_1.default();
        const result = await paymentModel.updatePayment(processID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update payment", details: message });
    }
};
exports.updatePayment = updatePayment;
/**
 * DELETE - Remove a payment record
 */
const deletePayment = async (req, res, next) => {
    try {
        const processID = Number(req.params.processID);
        if (isNaN(processID)) {
            res.status(400).json({ error: "Invalid processID" });
            return;
        }
        const paymentModel = new payment_1.default();
        const result = await paymentModel.deletePayment(processID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deletePayment = deletePayment;
