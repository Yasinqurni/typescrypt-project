import knex, { Knex } from 'knex';
import { DatabaseConfig } from './config';

export default function knexInstance(c: DatabaseConfig): Knex {
    const db = knex({
        client: c.dialect,
        connection: {
            host: c.host,
            port: Number(c.port),
            user: c.username,
            password: c.password,
            database: c.database,
        },
        pool: {
            min: c.pool.min || 2,
            max: c.pool.max || 10,
            acquireTimeoutMillis: c.pool.acquireTimeoutMillis || 30000,
            idleTimeoutMillis: c.pool.idleTimeoutMillis || 10000,
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    });

    
    // db.on('query', (query) => {
    //     console.log('Executing Query:', query.sql);
    //     if (query.bindings) {
    //         console.log('Bindings:', query.bindings);
    //     }
    // });

    return db;
}
