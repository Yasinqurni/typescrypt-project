import * as dotenv from 'dotenv'
import { Knex } from 'knex'

export interface AppConfig {
    database: DatabaseConfig
    app: AppSettings
    dbKnex?: Knex
}

export interface DatabaseConfig {
    username: string
    password: string
    database: string
    host: string
    dialect: string
    port: string
    pool: {
        min: number
        max: number
        acquireTimeoutMillis: number
        idleTimeoutMillis: number
    }
}

export interface AppSettings {
    port: string
    nodeEnv: string
}

export interface Config {
    loadConfig(): AppConfig
}

export class ConfigLoader implements Config {

  loadConfig(): AppConfig {
    dotenv.config()

    const config: AppConfig = {
        database: {
            username: String(process.env.DB_USER),
            password: String(process.env.DB_PASSWORD),
            database: String(process.env.DB_NAME),
            host: String(process.env.DB_HOST),
            dialect: String(process.env.DB_DIALECT),
            port: String(process.env.DB_PORT),
            pool: {
                min: Number(process.env.DB_POOLING_MIN),
                max: Number(process.env.DB_POOLING_MAX),
                acquireTimeoutMillis: Number(process.env.DB_POOLING_ACQUIRE_TIMEOUT),
                idleTimeoutMillis: Number(process.env.DB_POOLING_IDLE_TIMEOUT),
            }
        },
        app: {
            port: String(process.env.APP_PORT),
            nodeEnv: String(process.env.NODE_ENV),
        },
    }

    return config
  }
}
