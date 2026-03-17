"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.updateOrderItem = exports.getOrderItemData = exports.readOrderItem = exports.createOrderItem = void 0;
const orderItem_1 = __importDefault(require("../models/orderItem"));
// CREATE
const createOrderItem = async (req, res) => {
    try {
        const payload = req.body;
        const orderItem = new orderItem_1.default();
        const result = await orderItem.createOrderItem(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create order item",
            details: message
        });
    }
};
exports.createOrderItem = createOrderItem;
// READ ALL
const readOrderItem = async (_req, res, next) => {
    try {
        const orderItem = new orderItem_1.default();
        const rows = await orderItem.readOrderItem();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readOrderItem = readOrderItem;
// READ SINGLE
const getOrderItemData = async (req, res) => {
    const id = Number(req.params.orderItemID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderItemID" });
        return;
    }
    try {
        const orderItem = new orderItem_1.default();
        const row = await orderItem.getOrderItemData(id);
        if (!row) {
            res.status(404).json({ error: "Order item not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch order item",
            details: message
        });
    }
};
exports.getOrderItemData = getOrderItemData;
// UPDATE
const updateOrderItem = async (req, res) => {
    const id = Number(req.params.orderItemID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderItemID" });
        return;
    }
    try {
        const payload = req.body;
        const orderItem = new orderItem_1.default();
        const result = await orderItem.updateOrderItem(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update order item",
            details: message
        });
    }
};
exports.updateOrderItem = updateOrderItem;
// DELETE
const deleteOrderItem = async (req, res, next) => {
    const id = Number(req.params.orderItemID);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid orderItemID" });
        return;
    }
    try {
        const orderItem = new orderItem_1.default();
        const result = await orderItem.deleteOrderItem(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOrderItem = deleteOrderItem;
