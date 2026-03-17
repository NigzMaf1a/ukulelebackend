"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dispatchManager_1 = require("../controllers/dispatchManager");
const router = (0, express_1.Router)();
// GET /dispatch/undispatched -> fetch all records where Dispatched = 'No'
router.get("/undispatched", dispatchManager_1.getUndispatched);
// PATCH /dispatch/update/:dispatchID -> mark a dispatch record as Dispatched = 'Yes'
router.patch("/update/:dispatchID", dispatchManager_1.markDispatched);
exports.default = router;
