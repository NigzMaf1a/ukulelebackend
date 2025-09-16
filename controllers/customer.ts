// controllers/customer.ts
import { Request, Response, RequestHandler } from "express";
import CustomerModel from "../models/customer";
import { RegistrationPayload, RegistrationRow } from "../interfaces/registration";
import { CustomerPayload, CustomerRow } from "../interfaces/customer";

/**
 * CREATE - Add a new customer + registration
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const regData: RegistrationPayload = req.body;
    const customerModel = new CustomerModel();
    const result = await customerModel.createCustomerWithRegistration(regData);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to create customer", details: message });
  }
};

/**
 * READ - Get all customers with registration data
 */
export const getAllCustomers: RequestHandler = async (_req, res, next) => {
  try {
    const customerModel = new CustomerModel();
    const rows = await customerModel.readCustomersWithRegistration();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * READ - Get a single customer with registration data
 */
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customerID = Number(req.params.customerID);
    if (isNaN(customerID)) {
      res.status(400).json({ error: "Invalid customerID" });
      return;
    }

    const customerModel = new CustomerModel();
    const row = await customerModel.getCustomerData(customerID);

    if (!row) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    res.status(200).json(row);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch customer", details: message });
  }
};

/**
 * UPDATE - Edit only the customer table (not registration)
 */
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customerID = Number(req.params.customerID);
    if (isNaN(customerID)) {
      res.status(400).json({ error: "Invalid customerID" });
      return;
    }

    const data: CustomerPayload = req.body;
    const customerModel = new CustomerModel();
    const result = await customerModel.updateCustomer(customerID, data);

    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to update customer", details: message });
  }
};

/**
 * DELETE - Remove customer (does not remove registration)
 */
export const deleteCustomer: RequestHandler = async (req, res, next) => {
  try {
    const customerID = Number(req.params.customerID);
    if (isNaN(customerID)) {
      res.status(400).json({ error: "Invalid customerID" });
      return;
    }

    const customerModel = new CustomerModel();
    const result = await customerModel.deleteCustomer(customerID);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
