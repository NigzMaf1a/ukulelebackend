"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const band_1 = require("../controllers/band");
const router = express_1.default.Router();
// GET all bookings where BookStatus = 'Untick'
router.get("/bookings/unticked", band_1.getUntickedBookings);
// PATCH booking to mark BookStatus = 'Tick'
router.patch("/bookings/:bookingID/tick", band_1.markBookingTicked);
exports.default = router;
