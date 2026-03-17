"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
// Registration endpoints
router.get("/users/pending", admin_1.getPendingUsers);
router.get("/users/approved", admin_1.getApprovedUsers);
router.get("/users/inactive", admin_1.getInactiveUsers);
router.get("/users/all", admin_1.getAllUsers);
// Content
router.get("/feedback", admin_1.getFeedback);
router.get("/about", admin_1.getAbout);
router.get("/contacts", admin_1.getContacts);
// Services
router.get("/bookings", admin_1.getBookings);
router.get("/lending", admin_1.getLending);
router.get("/penalties", admin_1.getPenalties);
router.get("/inspection", admin_1.getInspection);
router.get("/inventory", admin_1.getInventory);
router.get("/finances", admin_1.getFinances);
router.get("/supplies", admin_1.getSupplies);
//User operations
router.patch("/approve/:regID", admin_1.approvePendingUser);
router.patch("/deactivate/:regID", admin_1.deactivateActiveUser);
router.patch("/activate/:regID", admin_1.activateInactiveUser);
//misc
router.put('/about/update', admin_1.updateAbout);
router.get("/logged/:id", admin_1.getLoggedInAdmin);
exports.default = router;
