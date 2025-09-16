import { Request, Response } from "express";
import ServiceManager from "../models/serviceManager"; // adjust path if needed

const serviceManager = new ServiceManager();

/**
 * Controller to fetch pending services
 */
export const getPendingServices = async (req: Request, res: Response) => {
    try {
        const services = await serviceManager.fetchPending();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        console.error("Error in getPendingServices:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pending services" });
    }
};

/**
 * Controller to approve a pending service
 */
export const approveService = async (req: Request, res: Response) => {
    try {
        const { serviceID } = req.params;
        const success = await serviceManager.approvePending(Number(serviceID));
        if (!success) {
            return res.status(404).json({ success: false, message: "Service not found or already approved" });
        }
        res.status(200).json({ success: true, message: "Service approved" });
    } catch (error) {
        console.error("Error in approveService:", error);
        res.status(500).json({ success: false, message: "Failed to approve service" });
    }
};
