// controllers/inspector.ts
import { Request, Response, RequestHandler } from "express";
import InspectorModel from "../models/inspector";
import { InspectorPayload } from "../interfaces/inspector";

/**
 * CREATE - Add a new inspection record
 */
export const createInspector = async (req: Request, res: Response) => {
  try {
    const payload: InspectorPayload = req.body;
    const inspectorModel = new InspectorModel();
    const result = await inspectorModel.createInspector(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create inspection", details: message });
  }
};

/**
 * READ - Get all inspection records
 */
export const getAllInspectors: RequestHandler = async (_req, res, next) => {
  try {
    const inspectorModel = new InspectorModel();
    const rows = await inspectorModel.readInspectors();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single inspection record by ID
 */
export const getInspectorById = async (req: Request, res: Response) => {
  try {
    const inspectionID = Number(req.params.inspectionID);
    if (isNaN(inspectionID)) {
      res.status(400).json({ error: "Invalid inspectionID" });
      return;
    }

    const inspectorModel = new InspectorModel();
    const row = await inspectorModel.getInspectorData(inspectionID);

    if (!row) {
      res.status(404).json({ error: "Inspection record not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch inspection record", details: message });
  }
};

/**
 * UPDATE - Edit an existing inspection record
 */
export const updateInspector = async (req: Request, res: Response) => {
  try {
    const inspectionID = Number(req.params.inspectionID);
    if (isNaN(inspectionID)) {
      res.status(400).json({ error: "Invalid inspectionID" });
      return;
    }

    const data: InspectorPayload = req.body;
    const inspectorModel = new InspectorModel();
    const result = await inspectorModel.updateInspector(inspectionID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update inspection", details: message });
  }
};

/**
 * DELETE - Remove an inspection record
 */
export const deleteInspector: RequestHandler = async (req, res, next) => {
  try {
    const inspectionID = Number(req.params.inspectionID);
    if (isNaN(inspectionID)) {
      res.status(400).json({ error: "Invalid inspectionID" });
      return;
    }

    const inspectorModel = new InspectorModel();
    const result = await inspectorModel.deleteInspector(inspectionID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
