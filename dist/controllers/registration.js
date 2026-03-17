"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistration = exports.updateRegistration = exports.getRegistrationById = exports.getAllRegistrations = exports.createRegistration = void 0;
const registration_1 = __importDefault(require("../models/registration"));
/**
 * CREATE - Add a new registration
 */
const createRegistration = async (req, res) => {
    try {
        const payload = req.body;
        const registrationModel = new registration_1.default();
        const result = await registrationModel.createRegistration(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to create registration",
            details: message
        });
    }
};
exports.createRegistration = createRegistration;
/**
 * READ - Get all registrations
 */
const getAllRegistrations = async (_req, res, next) => {
    try {
        const registrationModel = new registration_1.default();
        const rows = await registrationModel.readRegistrations();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllRegistrations = getAllRegistrations;
/**
 * READ - Get a single registration by ID
 */
const getRegistrationById = async (req, res) => {
    try {
        const regID = Number(req.params.regID);
        if (isNaN(regID)) {
            res.status(400).json({ error: "Invalid regID" });
            return;
        }
        const registrationModel = new registration_1.default();
        const row = await registrationModel.getRegistration(regID);
        if (!row) {
            res.status(404).json({ error: "Registration not found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to fetch registration",
            details: message
        });
    }
};
exports.getRegistrationById = getRegistrationById;
/**
 * UPDATE - Edit an existing registration
 */
const updateRegistration = async (req, res) => {
    try {
        const regID = Number(req.params.regID);
        if (isNaN(regID)) {
            res.status(400).json({ error: "Invalid regID" });
            return;
        }
        const data = req.body;
        const registrationModel = new registration_1.default();
        const result = await registrationModel.updateRegistration(regID, data);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            error: "Failed to update registration",
            details: message
        });
    }
};
exports.updateRegistration = updateRegistration;
/**
 * DELETE - Remove a registration record
 */
const deleteRegistration = async (req, res, next) => {
    try {
        const regID = Number(req.params.regID);
        if (isNaN(regID)) {
            res.status(400).json({ error: "Invalid regID" });
            return;
        }
        const registrationModel = new registration_1.default();
        const result = await registrationModel.deleteRegistration(regID);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteRegistration = deleteRegistration;
