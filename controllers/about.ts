// controllers/about.ts
import { Request, Response, RequestHandler } from "express";
import AboutModel from "../models/about";
import { AboutPayload } from "../interfaces/about";

/**
 * CREATE - Add a new "About" record
 */
export const createAbout = async (req: Request, res: Response) => {
  try {
    const payload: AboutPayload = req.body;
    const aboutModel = new AboutModel();
    const result = await aboutModel.createAbout(payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create About record", details: message });
  }
};

/**
 * READ - Get all About rows
 */
export const getAllAbout: RequestHandler = async (_req, res, next) => {
  try {
    const aboutModel = new AboutModel();
    const rows = await aboutModel.getAllAbout();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get the first About record (common use case)
 */
export const getAbout = async (_req: Request, res: Response) => {
  try {
    const aboutModel = new AboutModel();
    const row = await aboutModel.getAbout();
    if (!row) {
      res.status(404).json({ error: "No About record found" });
      return;
    }
    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch About record", details: message });
  }
};

/**
 * UPDATE - Edit the About table
 * (assumes there’s only one row)
 */
export const updateAbout = async (req: Request, res: Response) => {
  try {
    const payload: AboutPayload = req.body;
    const aboutModel = new AboutModel();
    const result = await aboutModel.updateAbout(payload);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update About record", details: message });
  }
};

/**
 * DELETE - Remove all About rows
 */
export const deleteAbout: RequestHandler = async (_req, res, next) => {
  try {
    const aboutModel = new AboutModel();
    const result = await aboutModel.deleteAbout();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
