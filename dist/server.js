"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
//route imports
const auth_1 = __importDefault(require("./routes/auth"));
const about_1 = __importDefault(require("./routes/about"));
const booking_1 = __importDefault(require("./routes/booking"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const dispatch_1 = __importDefault(require("./routes/dispatch"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const finance_1 = __importDefault(require("./routes/finance"));
const inspector_1 = __importDefault(require("./routes/inspector"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const lending_1 = __importDefault(require("./routes/lending"));
const payments_1 = __importDefault(require("./routes/payments"));
const penalty_1 = __importDefault(require("./routes/penalty"));
const services_1 = __importDefault(require("./routes/services"));
const supply_1 = __importDefault(require("./routes/supply"));
const serviceManager_1 = __importDefault(require("./routes/serviceManager"));
const dispatchManager_1 = __importDefault(require("./routes/dispatchManager"));
const financeManager_1 = __importDefault(require("./routes/financeManager"));
const band_1 = __importDefault(require("./routes/band"));
const admin_1 = __importDefault(require("./routes/admin"));
const allocatedEquipment_1 = __importDefault(require("./routes/allocatedEquipment"));
const penaltyPayment_1 = __importDefault(require("./routes/penaltyPayment"));
const orderPayments_1 = __importDefault(require("./routes/orderPayments"));
const orderItem_1 = __importDefault(require("./routes/orderItem"));
const orders_1 = __importDefault(require("./routes/orders"));
const registration_1 = __importDefault(require("./routes/registration"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.use((0, helmet_1.default)());
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? [process.env.CLIENT_ORIGIN]
  : ['http://localhost:5173', 'http://localhost:5000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.options('', (0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
//Routes
app.use('/api/auth', auth_1.default);
app.use('/api/about', about_1.default);
app.use('/api/booking', booking_1.default);
app.use('/api/contacts', contacts_1.default);
app.use('/api/dispatch', dispatch_1.default);
app.use('/api/feedback', feedback_1.default);
app.use('/api/finance', finance_1.default);
app.use('/api/inspection', inspector_1.default);
app.use('/api/inventory', inventory_1.default);
app.use('/api/lending', lending_1.default);
app.use('/api/payment', payments_1.default);
app.use('/api/penalty', penalty_1.default);
app.use('/api/services', services_1.default);
app.use('/api/supply', supply_1.default);
app.use("/api/serviceManager", serviceManager_1.default);
app.use("/api/dispatchManager", dispatchManager_1.default);
app.use("/api/financeManager", financeManager_1.default);
app.use("/api/band", band_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/allocatedEquipment", allocatedEquipment_1.default);
app.use("/api/penaltyPayment", penaltyPayment_1.default);
app.use("/api/orderPayment", orderPayments_1.default);
app.use("/api/orderItem", orderItem_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/registration", registration_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Ukulele Band API is up' });
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use(errorHandler_1.default);
const server = app.listen(PORT, () => {
    console.log(`Ukulele band backend running at http://localhost:${PORT}`);
});
async function gracefulShutdown() {
    console.log(' Graceful shutdown initiated');
    server.close(() => {
        console.log('HTTP server closed');
        // await dbPool.end();
        process.exit(0);
    });
}
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
