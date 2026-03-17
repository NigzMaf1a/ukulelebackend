"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderPayment = exports.updateOrderPayment = exports.getOrderPaymentData = exports.readOrderPayment = exports.createOrderPayment = void 0;
const orderPayment_1 = __importDefault(require("../models/orderPayment"));
// CREATE
const createOrderPayment = async (req, res) => {
    try {
        const payload = req.body;
        const orderPayment = new orderPayment_1.default();
        const result = await orderPayment.createOrderPayment(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create order payment",
            details: message
        });
    }
};
exports.createOrderPayment = createOrderPayment;
// READ ALL
const readOrderPayment = async (_req, res, next) => {
    try {
        const orderPayment = new orderPayment_1.default();
        const rows = await orderPayment.readOrderPayment();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readOrderPayment = readOrderPayment;
// READ SINGLE
const getOrderPaymentData = async (req, res) => {
    const id = Number(req.params.orderPayID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderPayID" });
        return;
    }
    try {
        const orderPayment = new orderPayment_1.default();
        const row = await orderPayment.getOrderPaymentData(id);
        if (!row) {
            res.status(404).json({ error: "Order payment not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch order payment",
            details: message
        });
    }
};
exports.getOrderPaymentData = getOrderPaymentData;
// UPDATE
const updateOrderPayment = async (req, res) => {
    const id = Number(req.params.orderPayID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderPayID" });
        return;
    }
    try {
        const payload = req.body;
        const orderPayment = new orderPayment_1.default();
        const result = await orderPayment.updateOrderPayment(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update order payment",
            details: message
        });
    }
};
exports.updateOrderPayment = updateOrderPayment;
// DELETE
const deleteOrderPayment = async (req, res, next) => {
    const id = Number(req.params.orderPayID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderPayID" });
        return;
    }
    try {
        const orderPayment = new orderPayment_1.default();
        const result = await orderPayment.deleteOrderPayment(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOrderPayment = deleteOrderPayment;
