// controllers/inventor.ts
import { Request, Response, RequestHandler } from "express";
import InventoryModel from "../models/inventory";
import { InventoryPayload } from "../interfaces/inventory";

/**
 * CREATE - Add a new inventory record
 */
export const createInventory = async (req: Request, res: Response) => {
  try {
    const payload: InventoryPayload = req.body;
    const inventoryModel = new InventoryModel();
    const result = await inventoryModel.createInventory(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create inventory", details: message });
  }
};

/**
 * READ - Get all inventory records
 */
export const getAllInventory: RequestHandler = async (_req, res, next) => {
  try {
    const inventoryModel = new InventoryModel();
    const rows = await inventoryModel.readInventory();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single inventory record by EquipmentID
 */
export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const equipmentID = Number(req.params.equipmentID);
    if (isNaN(equipmentID)) {
      res.status(400).json({ error: "Invalid equipmentID" });
      return;
    }

    const inventoryModel = new InventoryModel();
    const row = await inventoryModel.getInventoryData(equipmentID);

    if (!row) {
      res.status(404).json({ error: "Inventory record not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch inventory record", details: message });
  }
};

/**
 * UPDATE - Edit an existing inventory record
 */
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const equipmentID = Number(req.params.equipmentID);
    if (isNaN(equipmentID)) {
      res.status(400).json({ error: "Invalid equipmentID" });
      return;
    }

    const data: InventoryPayload = req.body;
    const inventoryModel = new InventoryModel();
    const result = await inventoryModel.updateInventory(equipmentID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update inventory", details: message });
  }
};

/**
 * DELETE - Remove an inventory record
 */
export const deleteInventory: RequestHandler = async (req, res, next) => {
  try {
    const equipmentID = Number(req.params.equipmentID);
    if (isNaN(equipmentID)) {
      res.status(400).json({ error: "Invalid equipmentID" });
      return;
    }

    const inventoryModel = new InventoryModel();
    const result = await inventoryModel.deleteInventory(equipmentID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
