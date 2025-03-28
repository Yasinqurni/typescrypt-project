import { HttpStatus } from './status-code';

export class BaseError extends Error {
    public readonly statusCode: number;
    public readonly errors?: any[];

    constructor(message: string, statusCode: number, errors?: any[]) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends BaseError {
    constructor(message: string, errors?: any[]) {
        super(message, HttpStatus.BAD_REQUEST, errors);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}