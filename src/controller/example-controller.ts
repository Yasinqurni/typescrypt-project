import { NextFunction, Request, Response } from "express";
import { ExampleService } from "../service/example-service";
import { ExampleRequest } from "../entity/request/create-example-request";
import { errorResponse, successResponse } from "../../pkg/response/response";
import { HttpStatus } from "../../pkg/response/status-code";

export interface ExampleController {
    create(req: Request, res: Response, next: NextFunction): Promise<Response>
}

export class ExampleControllerImpl implements ExampleController {
    constructor(
        private exampleService: ExampleService
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            const data: ExampleRequest = req.body;

            if (data.examples.length === 0) {
                return errorResponse(res, 'No data provided', HttpStatus.BAD_REQUEST);
            }

            const result = await this.exampleService.create(data);

            return successResponse(res, 'Success Create Examples Data', HttpStatus.CREATED, result);
        
        } catch (error) {
            next(error)
        }   

    }
}