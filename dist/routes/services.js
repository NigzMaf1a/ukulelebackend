"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../controllers/services");
const router = (0, express_1.Router)();
router.post("/add", services_1.createService);
router.get("/get", services_1.getAllServices);
router.get("/get/byid/:serviceID", services_1.getServiceById);
router.put("/put/:serviceID", services_1.updateService);
router.patch("/:serviceID/status", services_1.updateServiceStatus); // update ServiceStatus only
router.patch("/:serviceID/payment", services_1.updatePaymentStatus); // update PaymentStatus only
router.delete("/delete/:serviceID", services_1.deleteService);
exports.default = router;
