import {ServerDao} from "./Server"
import { EnvironmentVariables } from "./config/IConfig"
import * as dotenv from "dotenv"
dotenv.config({})
// import {EnvironmentVariables} from 

let config:EnvironmentVariables = Object.freeze({
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV
})

console.log(process.env.PORT)
let serverDao = new ServerDao(config)

let run =serverDao.run()

let routes =serverDao.setUpRoutes()



