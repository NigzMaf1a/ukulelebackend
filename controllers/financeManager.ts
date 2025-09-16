import { Request, Response } from "express";
import FinanceManager from "../models/financeManager";

const financeManager = new FinanceManager();

// GET services not paid
export const getNotPaidServices = async (req: Request, res: Response) => {
    try {
        const services = await financeManager.fetchNotPaid();
        res.status(200).json({ success: true, data: services });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch not paid services", error: err });
    }
};

// GET finance records by CustomerID
export const getFinanceByCustomer = async (req: Request, res: Response) => {
    const { customerID } = req.params;
    if (!customerID) {
        return res.status(400).json({ success: false, message: "CustomerID is required" });
    }

    try {
        const records = await financeManager.fetchFinanceByCustomerID(Number(customerID));
        res.status(200).json({ success: true, data: records });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch finance records", error: err });
    }
};

// PATCH service PaymentStatus to 'Paid' by ServiceID
export const markServicePaid = async (req: Request, res: Response) => {
    const { serviceID } = req.params;
    if (!serviceID) {
        return res.status(400).json({ success: false, message: "ServiceID is required" });
    }

    try {
        const updated = await financeManager.updateServicesToPaid(Number(serviceID));
        if (updated) {
            res.status(200).json({ success: true, message: "Service marked as Paid" });
        } else {
            res.status(404).json({ success: false, message: "Service not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update service", error: err });
    }
};
