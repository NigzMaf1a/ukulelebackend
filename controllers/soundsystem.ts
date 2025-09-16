import { Request, Response } from "express";
import SoundSystem from "../models/soundsystem";

const soundSystem = new SoundSystem();

// Get all unperformed lending entries
export const getNonPerformedLendings = async (req: Request, res: Response) => {
    try {
        const rows = await soundSystem.getNonPerformed();
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch data", error: err });
    }
};

// Update a lending entry to Performed = 'Yes'
export const updateLendingPerformed = async (req: Request, res: Response) => {
    const { lendID } = req.params;

    if (!lendID) {
        return res.status(400).json({ success: false, message: "LendID is required" });
    }

    try {
        const updated = await soundSystem.updateNonPerformed(Number(lendID));
        if (updated) {
            res.status(200).json({ success: true, message: "Lending marked as performed" });
        } else {
            res.status(404).json({ success: false, message: "Lending not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update lending", error: err });
    }
};
