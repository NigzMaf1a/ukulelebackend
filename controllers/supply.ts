// controllers/supply.ts
import { Request, Response, RequestHandler } from "express";
import SupplyModel from "../models/supply";
import { SupplyPayload } from "../interfaces/supply";

/**
 * CREATE - Add a new supply record
 */
export const createSupply = async (req: Request, res: Response) => {
  try {
    const data: SupplyPayload = req.body;
    const supplyModel = new SupplyModel();
    const result = await supplyModel.createSupply(data);

    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create supply", details: message });
  }
};

/**
 * READ - Get all supply records
 */
export const getAllSupplies: RequestHandler = async (_req, res, next) => {
  try {
    const supplyModel = new SupplyModel();
    const rows = await supplyModel.readSupplies();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single supply record by ID
 */
export const getSupplyById = async (req: Request, res: Response) => {
  try {
    const supplyID = Number(req.params.supplyID);
    if (isNaN(supplyID)) {
      res.status(400).json({ error: "Invalid supplyID" });
      return;
    }

    const supplyModel = new SupplyModel();
    const row = await supplyModel.getSupplyData(supplyID);

    if (!row) {
      res.status(404).json({ error: "Supply record not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch supply record", details: message });
  }
};

/**
 * UPDATE - Update an existing supply record
 */
export const updateSupply = async (req: Request, res: Response) => {
  try {
    const supplyID = Number(req.params.supplyID);
    if (isNaN(supplyID)) {
      res.status(400).json({ error: "Invalid supplyID" });
      return;
    }

    const data: SupplyPayload = req.body;
    const supplyModel = new SupplyModel();
    const result = await supplyModel.updateSupply(supplyID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update supply record", details: message });
  }
};

/**
 * DELETE - Remove a supply record
 */
export const deleteSupply: RequestHandler = async (req, res, next) => {
  try {
    const supplyID = Number(req.params.supplyID);
    if (isNaN(supplyID)) {
      res.status(400).json({ error: "Invalid supplyID" });
      return;
    }

    const supplyModel = new SupplyModel();
    const result = await supplyModel.deleteSupply(supplyID);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
