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
