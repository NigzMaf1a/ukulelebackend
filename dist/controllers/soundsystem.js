"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLendingPerformed = exports.getNonPerformedLendings = void 0;
const soundsystem_1 = __importDefault(require("../models/soundsystem"));
const soundSystem = new soundsystem_1.default();
// Get all unperformed lending entries
const getNonPerformedLendings = async (req, res) => {
    try {
        const rows = await soundSystem.getNonPerformed();
        res.status(200).json({ success: true, data: rows });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch data", error: err });
    }
};
exports.getNonPerformedLendings = getNonPerformedLendings;
// Update a lending entry to Performed = 'Yes'
const updateLendingPerformed = async (req, res) => {
    const { lendID } = req.params;
    if (!lendID) {
        return res.status(400).json({ success: false, message: "LendID is required" });
    }
    try {
        const updated = await soundSystem.updateNonPerformed(Number(lendID));
        if (updated) {
            res.status(200).json({ success: true, message: "Lending marked as performed" });
        }
        else {
            res.status(404).json({ success: false, message: "Lending not found" });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to update lending", error: err });
    }
};
exports.updateLendingPerformed = updateLendingPerformed;
