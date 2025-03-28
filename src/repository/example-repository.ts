import { Knex } from 'knex';
import * as exampleModel from '../entity/model/example-model';

export interface ExampleRepository {
    create(data: Partial<exampleModel.Example[]>): Promise<number[]>;
    getAll(): Promise<exampleModel.Example[]>
}

export class ExampleRepositoryImpl implements ExampleRepository {
    
    constructor(
        private db: Knex
    ) {}

    async create(data: Partial<exampleModel.Example[]>): Promise<number[]> {
        return this.db(exampleModel.dbName).insert(data);
    }

    async getAll(): Promise<exampleModel.Example[]> {
        return this.db(exampleModel.dbName).select('*');
    }
}