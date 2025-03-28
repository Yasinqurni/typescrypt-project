import { NextFunction, Response, Request } from "express";
import { BaseError } from "../../pkg/response/error-handle";
import { errorResponse } from "../../pkg/response/response";
import { HttpStatus } from "../../pkg/response/status-code";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
        return errorResponse(res, err.message, err.statusCode, err.errors);
    }

    return errorResponse(res, 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR, undefined);
}
