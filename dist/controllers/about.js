"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAbout = exports.updateAbout = exports.getAbout = exports.getAllAbout = exports.createAbout = void 0;
const about_1 = __importDefault(require("../models/about"));
/**
 * CREATE - Add a new "About" record
 */
const createAbout = async (req, res) => {
    try {
        const payload = req.body;
        const aboutModel = new about_1.default();
        const result = await aboutModel.createAbout(payload);
        res.status(201).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to create About record", details: message });
    }
};
exports.createAbout = createAbout;
/**
 * READ - Get all About rows
 */
const getAllAbout = async (_req, res, next) => {
    try {
        const aboutModel = new about_1.default();
        const rows = await aboutModel.getAllAbout();
        res.status(200).json(rows);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllAbout = getAllAbout;
/**
 * READ - Get the first About record (common use case)
 */
const getAbout = async (_req, res) => {
    try {
        const aboutModel = new about_1.default();
        const row = await aboutModel.getAbout();
        if (!row) {
            res.status(404).json({ error: "No About record found" });
            return;
        }
        res.status(200).json(row);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch About record", details: message });
    }
};
exports.getAbout = getAbout;
/**
 * UPDATE - Edit the About table
 * (assumes there’s only one row)
 */
const updateAbout = async (req, res) => {
    try {
        const payload = req.body;
        const aboutModel = new about_1.default();
        const result = await aboutModel.updateAbout(payload);
        res.status(200).json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ error: "Failed to update About record", details: message });
    }
};
exports.updateAbout = updateAbout;
/**
 * DELETE - Remove all About rows
 */
const deleteAbout = async (_req, res, next) => {
    try {
        const aboutModel = new about_1.default();
        const result = await aboutModel.deleteAbout();
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAbout = deleteAbout;
