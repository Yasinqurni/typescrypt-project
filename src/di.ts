import { AppConfig } from "../pkg/config";
import express, { Request, Response }  from 'express'
import * as exampleRepository from './repository/example-repository';
import * as exampleService from './service/example-service';
import * as exampleController from './controller/example-controller';
import exampleRouteV1 from "./router/v1/example-route";

export default function Init(router: express.Router, appConfig: AppConfig): express.Router {
    
    const exampleRepositoryImpl = new exampleRepository.ExampleRepositoryImpl(appConfig.dbKnex)
    const exampleServiceImpl = new exampleService.ExampleServiceImpl(exampleRepositoryImpl)
    const exampleControllerImpl = new exampleController.ExampleControllerImpl(exampleServiceImpl)

    router.get('/health', (_req: Request, res: Response) => {
        res.status(200).send('OK');
    });

    // v1
    {
        exampleRouteV1(exampleControllerImpl, router)
    }
    
    return router
}