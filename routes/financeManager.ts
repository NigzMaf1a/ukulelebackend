import express from "express";
import { getNotPaidServices, getFinanceByCustomer, markServicePaid } from "../controllers/financeManager";

const router = express.Router();

// GET all services where PaymentStatus = 'Not Paid'
router.get("/services/not-paid", getNotPaidServices);

// GET finance records by CustomerID
router.get("/finance/customer/:customerID", getFinanceByCustomer);

// PATCH service to mark as Paid by ServiceID
router.patch("/services/:serviceID/paid", markServicePaid);

export default router;
