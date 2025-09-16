import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') }); 

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

//route imports
import authRoutes from './routes/auth';
import aboutRoutes from './routes/about';
import bookingRoutes from './routes/booking';
import contactRoutes from './routes/contacts';
import customerRoutes from './routes/customer';
import dispatchRoutes from './routes/dispatch';
import feedbackRoutes from './routes/feedback';
import financeRoutes from './routes/finance';
import inspectorRoutes from './routes/inspector';
import inventoryRoutes from './routes/inventory';
import lendingRoutes from './routes/lending';
import memberRoutes from './routes/member';
import paymentRoutes from './routes/payments';
import penaltyRoutes from './routes/penalty';
import serviceRoutes from './routes/services';
import supplyRoutes from './routes/supply';
import servicesManagerRoutes from "./routes/serviceManager";
import dispatchManagerRoutes from "./routes/dispatchManager";
import financeManagerRoutes from "./routes/financeManager";
import SoundSystemRoutes from './routes/soundsystem';
import bandRoutes from './routes/band';

import authMiddleware from './middleware/auth';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(helmet());

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? [process.env.CLIENT_ORIGIN]
  : ['http://localhost:3000','http://localhost:5000'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('',cors());


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/dispatch', dispatchRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/inspector', inspectorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/lending', lendingRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/penalty', penaltyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/supply', supplyRoutes);
app.use("/api/serviceManager", servicesManagerRoutes);
app.use("/api/dispatchManager", dispatchManagerRoutes);
app.use("/api/financeManager", financeManagerRoutes);
app.use("/api/soundSytem", SoundSystemRoutes);
app.use("/api/band", bandRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ukulele Band API is up' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Ukulele band backend running at http://localhost:${PORT}`);
});

async function gracefulShutdown() {
  console.log('💀 Graceful shutdown initiated');
  server.close(() => {
    console.log('HTTP server closed');
    // await dbPool.end();
    process.exit(0);
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);