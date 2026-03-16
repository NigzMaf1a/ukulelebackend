// controllers/services.ts
import { Request, Response, RequestHandler } from "express";
import ServicesModel from "../models/services";
import { ServicesPayload } from "../interfaces/services";

/**
 * CREATE - Add a new service
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const data: ServicesPayload = req.body;
    const serviceModel = new ServicesModel();
    const result = await serviceModel.createService(data);

    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create service", details: message });
  }
};

/**
 * READ - Get all services
 */
export const getAllServices: RequestHandler = async (_req, res, next) => {
  try {
    const serviceModel = new ServicesModel();
    const rows = await serviceModel.getAllServices();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single service by ID
 */
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const serviceID = Number(req.params.serviceID);
    if (isNaN(serviceID)) {
      res.status(400).json({ error: "Invalid serviceID" });
      return;
    }

    const serviceModel = new ServicesModel();
    const row = await serviceModel.getServiceById(serviceID);

    if (!row) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch service", details: message });
  }
};

/**
 * UPDATE - Full service update
 * ⚠️ Typically admin only
 */
export const updateService = async (req: Request, res: Response) => {
  try {
    const serviceID = Number(req.params.serviceID);
    if (isNaN(serviceID)) {
      res.status(400).json({ error: "Invalid serviceID" });
      return;
    }

    const data: Partial<ServicesPayload> = req.body;
    const serviceModel = new ServicesModel();
    const result = await serviceModel.updateService(serviceID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update service", details: message });
  }
};

/**
 * UPDATE - ServiceStatus only
 */
export const updateServiceStatus = async (req: Request, res: Response) => {
  try {
    const serviceID = Number(req.params.serviceID);
    const { status } = req.body;

    if (isNaN(serviceID) || !status) {
      res.status(400).json({ error: "Invalid serviceID or status" });
      return;
    }

    const serviceModel = new ServicesModel();
    const result = await serviceModel.updateServiceStatus(serviceID, status);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update service status", details: message });
  }
};

/**
 * UPDATE - PaymentStatus only
 */
export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const serviceID = Number(req.params.serviceID);
    const { payment } = req.body;

    if (isNaN(serviceID) || !payment) {
      res.status(400).json({ error: "Invalid serviceID or payment status" });
      return;
    }

    const serviceModel = new ServicesModel();
    const result = await serviceModel.updatePaymentStatus(serviceID, payment);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update payment status", details: message });
  }
};

/**
 * DELETE - Remove a service
 */
export const deleteService: RequestHandler = async (req, res, next) => {
  try {
    const serviceID = Number(req.params.serviceID);
    if (isNaN(serviceID)) {
      res.status(400).json({ error: "Invalid serviceID" });
      return;
    }

    const serviceModel = new ServicesModel();
    const result = await serviceModel.deleteService(serviceID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
