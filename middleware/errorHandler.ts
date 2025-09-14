import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  void next; // to avoid unused variable lint error

  const status = err.status || 500;
  const errorMessages: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized access',
    403: 'Forbidden access',
    404: 'Resource not found',
    422: 'Unprocessable entity',
    429: 'Too many requests',
    500: 'Internal server error',
  };

  // Log the full error (can customize logging for production)
  console.error('[ERROR]', err);

  // Use custom message from map, or fallback to error.message, or default generic
  const message = errorMessages[status] || err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};

export default errorHandler;