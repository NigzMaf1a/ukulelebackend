"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updatePaymentStatus = exports.updateServiceStatus = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const services_1 = __importDefault(require("../models/services"));
/**
 * CREATE - Add a new service
 */
const createService = async (req, res) => {
    try {
        const data = req.body;
        const serviceModel = new services_1.default();
        const result = await serviceModel.createService(data);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create service", details: message });
    }
};
exports.createService = createService;
/**
 * READ - Get all services
 */
const getAllServices = async (_req, res, next) => {
    try {
        const serviceModel = new services_1.default();
        const rows = await serviceModel.getAllServices();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllServices = getAllServices;
/**
 * READ - Get a single service by ID
 */
const getServiceById = async (req, res) => {
    try {
        const serviceID = Number(req.params.serviceID);
        if (isNaN(serviceID)) {
            res.status(400).json({ error: "Invalid serviceID" });
            return;
        }
        const serviceModel = new services_1.default();
        const row = await serviceModel.getServiceById(serviceID);
        if (!row) {
            res.status(404).json({ error: "Service not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch service", details: message });
    }
};
exports.getServiceById = getServiceById;
/**
 * UPDATE - Full service update
 * ⚠️ Typically admin only
 */
const updateService = async (req, res) => {
    try {
        const serviceID = Number(req.params.serviceID);
        if (isNaN(serviceID)) {
            res.status(400).json({ error: "Invalid serviceID" });
            return;
        }
        const data = req.body;
        const serviceModel = new services_1.default();
        const result = await serviceModel.updateService(serviceID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update service", details: message });
    }
};
exports.updateService = updateService;
/**
 * UPDATE - ServiceStatus only
 */
const updateServiceStatus = async (req, res) => {
    try {
        const serviceID = Number(req.params.serviceID);
        const { status } = req.body;
        if (isNaN(serviceID) || !status) {
            res.status(400).json({ error: "Invalid serviceID or status" });
            return;
        }
        const serviceModel = new services_1.default();
        const result = await serviceModel.updateServiceStatus(serviceID, status);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update service status", details: message });
    }
};
exports.updateServiceStatus = updateServiceStatus;
/**
 * UPDATE - PaymentStatus only
 */
const updatePaymentStatus = async (req, res) => {
    try {
        const serviceID = Number(req.params.serviceID);
        const { payment } = req.body;
        if (isNaN(serviceID) || !payment) {
            res.status(400).json({ error: "Invalid serviceID or payment status" });
            return;
        }
        const serviceModel = new services_1.default();
        const result = await serviceModel.updatePaymentStatus(serviceID, payment);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update payment status", details: message });
    }
};
exports.updatePaymentStatus = updatePaymentStatus;
/**
 * DELETE - Remove a service
 */
const deleteService = async (req, res, next) => {
    try {
        const serviceID = Number(req.params.serviceID);
        if (isNaN(serviceID)) {
            res.status(400).json({ error: "Invalid serviceID" });
            return;
        }
        const serviceModel = new services_1.default();
        const result = await serviceModel.deleteService(serviceID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteService = deleteService;
