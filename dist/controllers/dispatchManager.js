"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markDispatched = exports.getUndispatched = void 0;
const dispatchManager_1 = __importDefault(require("../models/dispatchManager"));
const dispatchManager = new dispatchManager_1.default();
const getUndispatched = async (req, res) => {
    try {
        const records = await dispatchManager.fetchUndispatched();
        res.status(200).json({ success: true, data: records });
    }
    catch (error) {
        console.error("Error fetching undispatched records:", error);
        res.status(500).json({ success: false, message: "Failed to fetch undispatched records" });
    }
};
exports.getUndispatched = getUndispatched;
const markDispatched = async (req, res) => {
    try {
        const { dispatchID } = req.params;
        const success = await dispatchManager.updateDispatch(Number(dispatchID));
        if (!success) {
            return res.status(404).json({ success: false, message: "Dispatch record not found or already dispatched" });
        }
        res.status(200).json({ success: true, message: "Dispatch record updated to 'Yes'" });
    }
    catch (error) {
        console.error("Error updating dispatch record:", error);
        res.status(500).json({ success: false, message: "Failed to update dispatch record" });
    }
};
exports.markDispatched = markDispatched;
