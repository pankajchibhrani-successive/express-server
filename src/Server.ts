import * as express from "express"

const bodyParser = require("body-parser")

// let app = express()
export class ServerDao
{

        private app; PORT ; NODE_ENV
    constructor(config){

        this.PORT = config.PORT,
        this.NODE_ENV = config.NODE_ENV
        // this.run(config)  
        // this.config= config
    }

    bootstrap(){
        this.initBodyParser()
       return this.setupRoutes()
    }

    setupRoutes(){
        try{
            this.app.get('/health-check', (req, res) => res.send('I am OK!'))
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

