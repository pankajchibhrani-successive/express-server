import * as express from "express"
import * as methods from "./router"
const bodyParser = require("body-parser")
// import {AdminRoute} from "./controller/trainee/routes";
import {AdminRoute} from "./router";
// AdminRoute.initRoutes
import { Database } from "./libs/Database";

// import * as routes from "./router"
import {Controller} from "./controller/trainee/Controller"
// import {errorHandler} from "./libs/routes/errorHandler"
// import router from "./controller/trainee/routes"
// import { resolveMx } from "dns"

let controllerDao = new Controller()

export class ServerDao
{
        public path ="/api"
        private app; PORT ; NODE_ENV
   
        constructor(config){
            this.app=express()
            this.PORT = config.PORT,
            this.NODE_ENV = config.NODE_ENV
        }

    bootstrap(){
        this.initBodyParser()
       return this.setUpRoutes()
    }

    setUpRoutes(){
        try{
            // controllerDao.get('/api/health-check', function(req,res,next){
                
            // })
            console.log(this.path,AdminRoute.instance)
           this.app.use(this.path, AdminRoute.instance)
            // this.app.use(errorHandler)

            console.log("sucesss")
        }
        catch(error){
            throw error;
            
        }
    }

    run(){
        try{
            this.app = express()
            
            this.app.listen(this.PORT ,() => console.log(`Example app listening at http://localhost:${this.PORT}`))

            new Database().open()
        }
        catch(error){
        throw error       
        }
      
       
    }
    initBodyParser(){
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }
   // 
}

