import { Request, Response, RequestHandler } from "express";
import AllocatedEquipment from "../models/allocatedEquipment";
import { AllocatedEquipmentPayload } from "../interfaces/allocatedEquipment";


/**
 * CREATE Allocated Equipment
 */
export const createAllocatedEquipment = async (req: Request, res: Response) => {
  try {
    const payload: AllocatedEquipmentPayload = req.body;

    const allocatedEquipment = new AllocatedEquipment();
    const result = await allocatedEquipment.createAllocatedEquipment(payload);

    res.status(201).json(result);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to create allocated equipment",
      details: message
    });
  }
};


/**
 * READ ALL Allocated Equipment
 */
export const readAllocatedEquipment: RequestHandler = async (_req, res, next) => {
  try {
    const allocatedEquipment = new AllocatedEquipment();
    const rows = await allocatedEquipment.readAllocatedEquipment();

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }
};


/**
 * GET SINGLE Allocated Equipment
 */
export const getAllocatedEquipmentData = async (req: Request, res: Response) => {

  const id = Number(req.params.allocatedEquipmentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid allocatedEquipmentID" });
    return;
  }

  try {

    const allocatedEquipment = new AllocatedEquipment();
    const row = await allocatedEquipment.getAllocatedEquipmentData(id);

    if (!row) {
      res.status(404).json({ error: "Allocated equipment not found" });
      return;
    }

    res.status(200).json(row);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to fetch allocated equipment",
      details: message
    });

  }
};


/**
 * UPDATE Allocated Equipment
 */
export const updateAllocatedEquipment = async (req: Request, res: Response) => {

  const id = Number(req.params.allocatedEquipmentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid allocatedEquipmentID" });
    return;
  }

  try {

    const payload: AllocatedEquipmentPayload = req.body;

    const allocatedEquipment = new AllocatedEquipment();
    const result = await allocatedEquipment.updateAllocatedEquipment(id, payload);

    res.status(200).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to update allocated equipment",
      details: message
    });

  }
};


/**
 * DELETE Allocated Equipment
 */
export const deleteAllocatedEquipment: RequestHandler = async (req, res, next) => {

  const id = Number(req.params.allocatedEquipmentID);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid allocatedEquipmentID" });
    return;
  }

  try {

    const allocatedEquipment = new AllocatedEquipment();
    const result = await allocatedEquipment.deleteAllocatedEquipment(id);

    res.status(200).json(result);

  } catch (err) {
    next(err);
  }
};