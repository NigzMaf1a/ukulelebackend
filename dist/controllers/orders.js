"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderData = exports.readOrders = exports.createOrder = void 0;
const orders_1 = __importDefault(require("../models/orders"));
/**
 * CREATE - Add a new order with items
 */
const createOrder = async (req, res) => {
    try {
        const payload = req.body;
        if (!Array.isArray(payload.items) || payload.items.length === 0) {
            return res.status(400).json({ error: "Order must include at least one item" });
        }
        const order = new orders_1.default();
        const result = await order.createOrder(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create order", details: message });
    }
};
exports.createOrder = createOrder;
/**
 * READ ALL - Get all orders
 */
const readOrders = async (_req, res, next) => {
    try {
        const order = new orders_1.default();
        const rows = await order.readOrders();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.readOrders = readOrders;
/**
 * READ SINGLE - Get order by ID
 */
const getOrderData = async (req, res) => {
    const id = Number(req.params.orderID);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid orderID" });
    try {
        const order = new orders_1.default();
        const row = await order.getOrderData(id);
        if (!row)
            return res.status(404).json({ error: "Order not found" });
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch order", details: message });
    }
};
exports.getOrderData = getOrderData;
/**
 * UPDATE - Update order
 */
const updateOrder = async (req, res) => {
    const id = Number(req.params.orderID);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid orderID" });
    try {
        const payload = req.body;
        const order = new orders_1.default();
        const result = await order.updateOrder(id, payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update order", details: message });
    }
};
exports.updateOrder = updateOrder;
/**
 * DELETE - Remove order
 */
const deleteOrder = async (req, res, next) => {
    const id = Number(req.params.orderID);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid orderID" });
    try {
        const order = new orders_1.default();
        const result = await order.deleteOrder(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOrder = deleteOrder;
