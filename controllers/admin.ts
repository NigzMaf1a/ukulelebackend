import { Request, Response } from "express";
import Admin from "../models/admin";

const adminService = new Admin();

export const getPendingUsers = async (_req: Request, res: Response) => {
  try {
    const data = await adminService.fetchPendingUsers();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending users" });
  }
};

export const getApprovedUsers = async (_req: Request, res: Response) => {
  try {
    const data = await adminService.fetchApprovedUsers();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch approved users" });
  }
};

export const getInactiveUsers = async (_req: Request, res: Response) => {
  try {
    const data = await adminService.fetchInactiveUsers();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inactive users" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const data = await adminService.fetchAllUsers();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch all users" });
  }
};

export const getFeedback = async (_req: Request, res: Response) => {
  try {
    const data = await adminService.fetchFeedback();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};

export const getAbout = async (_req: Request, res: Response) => {
  try {
    const about = await adminService.fetchAbout();
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch about detail" });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await adminService.fetchContacts();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch contact details" });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await adminService.fetchBookings();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const getLending = async (_req: Request, res: Response) => {
  try {
    const lending = await adminService.fetchLending();
    res.json(lending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch lending records" });
  }
};

export const getPenalties = async (_req: Request, res: Response) => {
  try {
    const penalties = await adminService.fetchPenalties();
    res.json(penalties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch penalties" });
  }
};

export const getInspection = async (_req: Request, res: Response) => {
  try {
    const inspectors = await adminService.fetchInspection();
    res.json(inspectors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inspection records" });
  }
};

export const getInventory = async (_req: Request, res: Response) => {
  try {
    const inventory = await adminService.fetchInventory();
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};

export const getFinances = async (_req: Request, res: Response) => {
  try {
    const finances = await adminService.fetchFinances();
    res.json(finances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch finances" });
  }
};

export const getSupplies = async (_req: Request, res: Response) => {
  try {
    const supplies = await adminService.fetchSupplies();
    res.json(supplies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch supplies" });
  }
};

export async function approvePendingUser(req: Request, res: Response) {
  try {
    const regID = Number(req.params.regID);
    const success = await adminService.approvePendingUser(regID);
    if (!success) return res.status(404).json({ message: "User not found or not pending" });
    res.json({ success: true, message: "User approved" });
  } catch (err) {
    console.error("Controller error (approvePendingUser):", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Deactivate a currently active user */
export async function deactivateActiveUser(req: Request, res: Response) {
  try {
    const regID = Number(req.params.regID);
    const success = await adminService.deactivateActiveUser(regID);
    if (!success) return res.status(404).json({ message: "User not found or not active" });
    res.json({ success: true, message: "User deactivated" });
  } catch (err) {
    console.error("Controller error (deactivateActiveUser):", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Reactivate a previously inactive user */
export async function activateInactiveUser(req: Request, res: Response) {
  try {
    const regID = Number(req.params.regID);
    const success = await adminService.activateInactiveUser(regID);
    if (!success) return res.status(404).json({ message: "User not found or not inactive" });
    res.json({ success: true, message: "User reactivated (set back to Pending)" });
  } catch (err) {
    console.error("Controller error (activateInactiveUser):", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateAbout(req:Request, res:Response){
  try{
    const detail = String(req.params.Detail)
    const success = await adminService.updateAbout(detail);
    if (!success) return res.status(404).json({ message: "About not updated" });
    res.json({ success: true, message: "About updated" });
  } catch(err){
    console.error("Controller error (updateAbout):", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getLoggedInAdmin = async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error("Controller error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

