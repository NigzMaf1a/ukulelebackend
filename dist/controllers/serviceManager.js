"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveService = exports.getPendingServices = void 0;
const serviceManager_1 = __importDefault(require("../models/serviceManager")); // adjust path if needed
const serviceManager = new serviceManager_1.default();
/**
 * Controller to fetch pending services
 */
const getPendingServices = async (req, res) => {
    try {
        const services = await serviceManager.fetchPending();
        res.status(200).json({ success: true, data: services });
    }
    catch (error) {
        console.error("Error in getPendingServices:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pending services" });
    }
};
exports.getPendingServices = getPendingServices;
/**
 * Controller to approve a pending service
 */
const approveService = async (req, res) => {
    try {
        const { serviceID } = req.params;
        const success = await serviceManager.approvePending(Number(serviceID));
        if (!success) {
            return res.status(404).json({ success: false, message: "Service not found or already approved" });
        }
        res.status(200).json({ success: true, message: "Service approved" });
    }
    catch (error) {
        console.error("Error in approveService:", error);
        res.status(500).json({ success: false, message: "Failed to approve service" });
    }
};
exports.approveService = approveService;
