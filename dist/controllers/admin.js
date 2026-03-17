"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInAdmin = exports.getSupplies = exports.getFinances = exports.getInventory = exports.getInspection = exports.getPenalties = exports.getLending = exports.getBookings = exports.getContacts = exports.getAbout = exports.getFeedback = exports.getAllUsers = exports.getInactiveUsers = exports.getApprovedUsers = exports.getPendingUsers = void 0;
exports.approvePendingUser = approvePendingUser;
exports.deactivateActiveUser = deactivateActiveUser;
exports.activateInactiveUser = activateInactiveUser;
exports.updateAbout = updateAbout;
const admin_1 = __importDefault(require("../models/admin"));
const adminService = new admin_1.default();
const getPendingUsers = async (_req, res) => {
    try {
        const data = await adminService.fetchPendingUsers();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch pending users" });
    }
};
exports.getPendingUsers = getPendingUsers;
const getApprovedUsers = async (_req, res) => {
    try {
        const data = await adminService.fetchApprovedUsers();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch approved users" });
    }
};
exports.getApprovedUsers = getApprovedUsers;
const getInactiveUsers = async (_req, res) => {
    try {
        const data = await adminService.fetchInactiveUsers();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch inactive users" });
    }
};
exports.getInactiveUsers = getInactiveUsers;
const getAllUsers = async (_req, res) => {
    try {
        const data = await adminService.fetchAllUsers();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch all users" });
    }
};
exports.getAllUsers = getAllUsers;
const getFeedback = async (_req, res) => {
    try {
        const data = await adminService.fetchFeedback();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch feedback" });
    }
};
exports.getFeedback = getFeedback;
const getAbout = async (_req, res) => {
    try {
        const about = await adminService.fetchAbout();
        res.json(about);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch about detail" });
    }
};
exports.getAbout = getAbout;
const getContacts = async (_req, res) => {
    try {
        const contacts = await adminService.fetchContacts();
        res.json(contacts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch contact details" });
    }
};
exports.getContacts = getContacts;
const getBookings = async (_req, res) => {
    try {
        const bookings = await adminService.fetchBookings();
        res.json(bookings);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
};
exports.getBookings = getBookings;
const getLending = async (_req, res) => {
    try {
        const lending = await adminService.fetchLending();
        res.json(lending);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch lending records" });
    }
};
exports.getLending = getLending;
const getPenalties = async (_req, res) => {
    try {
        const penalties = await adminService.fetchPenalties();
        res.json(penalties);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch penalties" });
    }
};
exports.getPenalties = getPenalties;
const getInspection = async (_req, res) => {
    try {
        const inspectors = await adminService.fetchInspection();
        res.json(inspectors);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch inspection records" });
    }
};
exports.getInspection = getInspection;
const getInventory = async (_req, res) => {
    try {
        const inventory = await adminService.fetchInventory();
        res.json(inventory);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch inventory" });
    }
};
exports.getInventory = getInventory;
const getFinances = async (_req, res) => {
    try {
        const finances = await adminService.fetchFinances();
        res.json(finances);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch finances" });
    }
};
exports.getFinances = getFinances;
const getSupplies = async (_req, res) => {
    try {
        const supplies = await adminService.fetchSupplies();
        res.json(supplies);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch supplies" });
    }
};
exports.getSupplies = getSupplies;
async function approvePendingUser(req, res) {
    try {
        const regID = Number(req.params.regID);
        const success = await adminService.approvePendingUser(regID);
        if (!success)
            return res.status(404).json({ message: "User not found or not pending" });
        res.json({ success: true, message: "User approved" });
    }
    catch (err) {
        console.error("Controller error (approvePendingUser):", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
/** Deactivate a currently active user */
async function deactivateActiveUser(req, res) {
    try {
        const regID = Number(req.params.regID);
        const success = await adminService.deactivateActiveUser(regID);
        if (!success)
            return res.status(404).json({ message: "User not found or not active" });
        res.json({ success: true, message: "User deactivated" });
    }
    catch (err) {
        console.error("Controller error (deactivateActiveUser):", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
/** Reactivate a previously inactive user */
async function activateInactiveUser(req, res) {
    try {
        const regID = Number(req.params.regID);
        const success = await adminService.activateInactiveUser(regID);
        if (!success)
            return res.status(404).json({ message: "User not found or not inactive" });
        res.json({ success: true, message: "User reactivated (set back to Pending)" });
    }
    catch (err) {
        console.error("Controller error (activateInactiveUser):", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
async function updateAbout(req, res) {
    try {
        const detail = String(req.params.Detail);
        const success = await adminService.updateAbout(detail);
        if (!success)
            return res.status(404).json({ message: "About not updated" });
        res.json({ success: true, message: "About updated" });
    }
    catch (err) {
        console.error("Controller error (updateAbout):", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getLoggedInAdmin = async (req, res) => {
    try {
        const { id } = req.params; // /admin/:id
        const RegID = parseInt(id, 10);
        if (isNaN(RegID)) {
            return res.status(400).json({ error: "Invalid RegID" });
        }
        const adminRows = await adminService.loggedInAdmin(RegID);
        if (adminRows.length === 0) {
            return res.status(404).json({ error: "Admin not found" });
        }
        return res.status(200).json(adminRows[0]); // return the single row
    }
    catch (err) {
        console.error("Controller error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getLoggedInAdmin = getLoggedInAdmin;
