import {ServerDao} from "./Server"
import { EnvironmentVariables } from "./config/IConfig"
import * as dotenv from "dotenv"
dotenv.config({})
// import {EnvironmentVariables} from 

let config:EnvironmentVariables = Object.freeze({
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV
})
let serverDao = new ServerDao(config)

class Index{

    constructor(){
    }

    run(){
        serverDao.run()
        return this
    }

    bootstrap(){
        serverDao.bootstrap()
        return this
    }

}
console.log(process.env.PORT)


let index = new Index()

index.run().bootstrap()

