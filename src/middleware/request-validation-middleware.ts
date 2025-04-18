import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateRequest<T extends object>(dtoClass: ClassConstructor<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(dtoClass, req.body);

        const errors = await validate(instance);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(err => ({
                    field: err.property,
                    constraints: err.constraints
                }))
            });

            return;
        }

        next();
    };
}