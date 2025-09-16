import { Request, Response } from "express";
import DispatchManager from "../models/dispatchManager";

const dispatchManager = new DispatchManager();

export const getUndispatched = async (req: Request, res: Response) => {
    try {
        const records = await dispatchManager.fetchUndispatched();
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        console.error("Error fetching undispatched records:", error);
        res.status(500).json({ success: false, message: "Failed to fetch undispatched records" });
    }
};

export const markDispatched = async (req: Request, res: Response) => {
    try {
        const { dispatchID } = req.params;
        const success = await dispatchManager.updateDispatch(Number(dispatchID));

        if (!success) {
            return res.status(404).json({ success: false, message: "Dispatch record not found or already dispatched" });
        }

        res.status(200).json({ success: true, message: "Dispatch record updated to 'Yes'" });
    } catch (error) {
        console.error("Error updating dispatch record:", error);
        res.status(500).json({ success: false, message: "Failed to update dispatch record" });
    }
};
