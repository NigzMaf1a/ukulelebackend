import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') }); 

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import contactRoutes from './routes/contacts';

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
app.use('/api/contacts', authMiddleware, contactRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ukulele Band API is up' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Aurum Domus backend running at http://localhost:${PORT}`);
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