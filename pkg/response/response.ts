import { Response } from 'express';
import { HttpStatus } from './status-code';

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: any[];
  meta?: any;
}

/**
 * Send success response
 * @param res Express Response object
 * @param message Success message
 * @param data Response data
 * @param meta Optional metadata (pagination, etc.)
 * @param statusCode HTTP status code (default: 200)
 */
export const successResponse = <T>(
  res: Response,
  message: string,
  statusCode: number = HttpStatus.OK,
  data?: T,
  meta?: any,
) => {
  const response: ApiResponse<T> = {
    status: 'success',
    message,
    data,
    meta
  };

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param res Express Response object
 * @param message Error message
 * @param errors Optional error details
 * @param statusCode HTTP status code (default: 400)
 */
export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = HttpStatus.BAD_REQUEST,
  errors?: any[],
) => {
  const response: ApiResponse = {
    status: 'error',
    message,
    errors: statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? undefined : errors
  };

  return res.status(statusCode).json(response);
};