import express from 'express'
import  { ExampleController } from '../../controller/example-controller'
import { validateRequest } from '../../middleware/request-validation-middleware'
import { ExampleRequest } from '../../entity/request/create-example-request'



export default function exampleRouteV1(c: ExampleController, router: express.Router): express.Router {

    router.post('/v1/example', validateRequest(ExampleRequest), c.create.bind(c))

    return router
}