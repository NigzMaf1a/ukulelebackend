"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markServicePaid = exports.getFinanceByCustomer = exports.getNotPaidServices = void 0;
const financeManager_1 = __importDefault(require("../models/financeManager"));
const financeManager = new financeManager_1.default();
// GET services not paid
const getNotPaidServices = async (req, res) => {
    try {
        const services = await financeManager.fetchNotPaid();
        res.status(200).json({ success: true, data: services });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch not paid services", error: err });
    }
};
exports.getNotPaidServices = getNotPaidServices;
// GET finance records by CustomerID
const getFinanceByCustomer = async (req, res) => {
    const { customerID } = req.params;
    if (!customerID) {
        return res.status(400).json({ success: false, message: "CustomerID is required" });
    }
    try {
        const records = await financeManager.fetchFinanceByCustomerID(Number(customerID));
        res.status(200).json({ success: true, data: records });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch finance records", error: err });
    }
};
exports.getFinanceByCustomer = getFinanceByCustomer;
// PATCH service PaymentStatus to 'Paid' by ServiceID
const markServicePaid = async (req, res) => {
    const { serviceID } = req.params;
    if (!serviceID) {
        return res.status(400).json({ success: false, message: "ServiceID is required" });
    }
    try {
        const updated = await financeManager.updateServicesToPaid(Number(serviceID));
        if (updated) {
            res.status(200).json({ success: true, message: "Service marked as Paid" });
        }
        else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to update service", error: err });
    }
};
exports.markServicePaid = markServicePaid;
