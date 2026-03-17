"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceManager_1 = require("../controllers/serviceManager");
const router = (0, express_1.Router)();
// GET /services/pending -> fetch all pending & paid services
router.get("/pending", serviceManager_1.getPendingServices);
// PATCH /services/approve/:serviceID -> approve a pending service
router.patch("/approve/:serviceID", serviceManager_1.approveService);
exports.default = router;
