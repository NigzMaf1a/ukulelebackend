"use strict";

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

Object.defineProperty(exports, "__esModule", { value: true });

const path = __importDefault(require("path"));
const dotenv = __importDefault(require("dotenv"));

dotenv.default.config({
  path: path.default.resolve(process.cwd(), ".env"),
});

const express = __importDefault(require("express"));
const cors = __importDefault(require("cors"));
const helmet = __importDefault(require("helmet"));
const compression = __importDefault(require("compression"));
const morgan = __importDefault(require("morgan"));

// Routes
const auth = __importDefault(require("./routes/auth"));
const about = __importDefault(require("./routes/about"));
const booking = __importDefault(require("./routes/booking"));
const contacts = __importDefault(require("./routes/contacts"));
const dispatch = __importDefault(require("./routes/dispatch"));
const feedback = __importDefault(require("./routes/feedback"));
const finance = __importDefault(require("./routes/finance"));
const inspector = __importDefault(require("./routes/inspector"));
const inventory = __importDefault(require("./routes/inventory"));
const lending = __importDefault(require("./routes/lending"));
const payments = __importDefault(require("./routes/payments"));
const penalty = __importDefault(require("./routes/penalty"));
const services = __importDefault(require("./routes/services"));
const supply = __importDefault(require("./routes/supply"));
const serviceManager = __importDefault(require("./routes/serviceManager"));
const dispatchManager = __importDefault(require("./routes/dispatchManager"));
const financeManager = __importDefault(require("./routes/financeManager"));
const band = __importDefault(require("./routes/band"));
const admin = __importDefault(require("./routes/admin"));
const allocatedEquipment = __importDefault(
  require("./routes/allocatedEquipment")
);
const penaltyPayment = __importDefault(
  require("./routes/penaltyPayment")
);
const orderPayment = __importDefault(require("./routes/orderPayments"));
const orderItem = __importDefault(require("./routes/orderItem"));
const orders = __importDefault(require("./routes/orders"));
const registration = __importDefault(require("./routes/registration"));

const errorHandler = __importDefault(
  require("./middleware/errorHandler")
);

const app = express.default();
const PORT = Number(process.env.PORT) || 5000;

app.use(helmet.default());

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5000",
  "https://ukulele-band-admin.vercel.app",
]);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      // ⚠️ DO NOT throw error (this breaks CORS response)
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// IMPORTANT: no manual app.options() needed

app.use(compression.default());
app.use(express.default.json());
app.use(express.default.urlencoded({ extended: true }));

app.use(
  morgan.default(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  )
);

// Routes
app.use("/api/auth", auth.default);
app.use("/api/about", about.default);
app.use("/api/booking", booking.default);
app.use("/api/contacts", contacts.default);
app.use("/api/dispatch", dispatch.default);
app.use("/api/feedback", feedback.default);
app.use("/api/finance", finance.default);
app.use("/api/inspection", inspector.default);
app.use("/api/inventory", inventory.default);
app.use("/api/lending", lending.default);
app.use("/api/payment", payments.default);
app.use("/api/penalty", penalty.default);
app.use("/api/services", services.default);
app.use("/api/supply", supply.default);
app.use("/api/serviceManager", serviceManager.default);
app.use("/api/dispatchManager", dispatchManager.default);
app.use("/api/financeManager", financeManager.default);
app.use("/api/band", band.default);
app.use("/api/admin", admin.default);
app.use("/api/allocatedEquipment", allocatedEquipment.default);
app.use("/api/penaltyPayment", penaltyPayment.default);
app.use("/api/orderPayment", orderPayment.default);
app.use("/api/orderItem", orderItem.default);
app.use("/api/orders", orders.default);
app.use("/api/registration", registration.default);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Ukulele Band API is up" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// error handler
app.use(errorHandler.default);

const server = app.listen(PORT, () => {
  console.log(
    `Ukulele band backend running at http://localhost:${PORT}`
  );
});

// graceful shutdown
async function gracefulShutdown() {
  console.log("Graceful shutdown initiated");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
