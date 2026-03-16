import { Request, Response, RequestHandler } from "express";
import RegistrationModel from "../models/registration";
import { RegistrationPayload } from "../interfaces/registration";

/**
 * CREATE - Add a new registration
 */
export const createRegistration = async (req: Request, res: Response) => {
  try {

    const payload: RegistrationPayload = req.body;

    const registrationModel = new RegistrationModel();
    const result = await registrationModel.createRegistration(payload);

    res.status(201).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to create registration",
      details: message
    });

  }
};


/**
 * READ - Get all registrations
 */
export const getAllRegistrations: RequestHandler = async (_req, res, next) => {
  try {

    const registrationModel = new RegistrationModel();
    const rows = await registrationModel.readRegistrations();

    res.status(200).json(rows);

  } catch (err) {

    next(err);

  }
};


/**
 * READ - Get a single registration by ID
 */
export const getRegistrationById = async (req: Request, res: Response) => {
  try {

    const regID = Number(req.params.regID);

    if (isNaN(regID)) {
      res.status(400).json({ error: "Invalid regID" });
      return;
    }

    const registrationModel = new RegistrationModel();
    const row = await registrationModel.getRegistration(regID);

    if (!row) {
      res.status(404).json({ error: "Registration not found" });
      return;
    }

    res.status(200).json(row);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to fetch registration",
      details: message
    });

  }
};


/**
 * UPDATE - Edit an existing registration
 */
export const updateRegistration = async (req: Request, res: Response) => {
  try {

    const regID = Number(req.params.regID);

    if (isNaN(regID)) {
      res.status(400).json({ error: "Invalid regID" });
      return;
    }

    const data: Partial<RegistrationPayload> = req.body;

    const registrationModel = new RegistrationModel();
    const result = await registrationModel.updateRegistration(regID, data);

    res.status(200).json(result);

  } catch (err) {

    const message = err instanceof Error ? err.message : "Unknown error";

    res.status(500).json({
      error: "Failed to update registration",
      details: message
    });

  }
};


/**
 * DELETE - Remove a registration record
 */
export const deleteRegistration: RequestHandler = async (req, res, next) => {
  try {

    const regID = Number(req.params.regID);

    if (isNaN(regID)) {
      res.status(400).json({ error: "Invalid regID" });
      return;
    }

    const registrationModel = new RegistrationModel();
    const result = await registrationModel.deleteRegistration(regID);

    res.status(200).json(result);

  } catch (err) {

    next(err);

  }
};