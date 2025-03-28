import { ConfigLoader } from './pkg/config'
import knexInstance from './pkg/knex'
import express from 'express'
import Init from './src/di'
import { errorHandler } from './src/middleware/global-error-handle-middleware'

async function initialize() {
    try {
        const configLoader = new ConfigLoader()
        const configEnv = configLoader.loadConfig()
    
        const db = knexInstance(configEnv.database)
        configEnv.dbKnex = db

        const app = express()
        //Middleware definitions
        app.disable('x-powered-by')
        app.use(express.json()) //form data to json
        app.use(express.urlencoded({extended: true})) //support for multiform data

        //router definition
        app.use('/api', Init(express.Router(), configEnv)) // API endpoint

        app.use(errorHandler as any)

        //launch the server
        app.listen(configEnv.app.port, () => {
            console.log(`server running at port ${configEnv.app.port}`)
        })
    } catch (error) {
        console.error('Error during initialization:', error)
    }
}

initialize();
 