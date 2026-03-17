"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financeManager_1 = require("../controllers/financeManager");
const router = express_1.default.Router();
// GET all services where PaymentStatus = 'Not Paid'
router.get("/services/not-paid", financeManager_1.getNotPaidServices);
// GET finance records by CustomerID
router.get("/finance/customer/:customerID", financeManager_1.getFinanceByCustomer);
// PATCH service to mark as Paid by ServiceID
router.patch("/services/:serviceID/paid", financeManager_1.markServicePaid);
exports.default = router;
