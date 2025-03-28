import { ExampleRepository } from "../repository/example-repository";
import { ExampleRequest } from "../entity/request/create-example-request";
import * as exampleModel from '../entity/model/example-model';

export interface ExampleService {
    create(data: ExampleRequest): Promise<number[]>
}

export class ExampleServiceImpl implements ExampleService {
    
    constructor(
        private exampleRepository: ExampleRepository
    ) {}

    async create(data: ExampleRequest): Promise<number[]> {

        const example: Partial<exampleModel.Example[]> = data.examples.map(each => {
            return {
                name: each.name,
                email: each.email,
                phone: each.phone,
                age: each.age,
                address: each.address,
                status: exampleModel.ExampleStatus.ACTIVE,
                is_verified: false
            }
        })
        
        return this.exampleRepository.create(example);
    }
}