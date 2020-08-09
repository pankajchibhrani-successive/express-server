import * as express from "express"
import * as methods from "./router"
const bodyParser = require("body-parser")
// import {AdminRoute} from "./controller/trainee/routes";
import {AdminRoute,UserRoute} from "./router";
// AdminRoute.initRoutes

import "reflect-metadata";
import { Database } from "./libs/Database";
import { SeedData } from "./libs/seedData";
import * as swagger from "swagger-express-ts";
import path from "path";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
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
        new SeedData().bootstrapSeedData()
        this.setUpRoutes()

    }

    setUpRoutes(){
        try{
            // controllerDao.get('/api/health-check', function(req,res,next){
                this.app.use("/api-docs/swagger", express.static("swagger"));
            this.app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
            
            this.app.use(swagger.express({
				definition: {
					info: {
						title: "Express MongoDB API Documentation",
						version: "1.0.0"
					},
					externalDocs: {
						url: "My url"
					},
					basePath:"/api",
					responses: {
						500: {}
					},
					securityDefinitions: {
							
						authorization: {
							type: SwaggerDefinitionConstant.Security.Type.API_KEY,
							in: SwaggerDefinitionConstant.Security.In.HEADER,
							name: 'authorization'
						},

						apiKeyHeader: {
							type: SwaggerDefinitionConstant.Security.Type.API_KEY,
							in: SwaggerDefinitionConstant.Security.In.HEADER,
							 name: "api_key"
						},
						basicAuth: {
							type: SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
						},
						// lang: {
						// 	type: SwaggerDefinitionConstant.Security.Type.API_KEY,
						// 	in: SwaggerDefinitionConstant.Security.In.HEADER,
						// 	name: "lang"
						// },
						platform: {
							type: SwaggerDefinitionConstant.Security.Type.API_KEY,
							in: SwaggerDefinitionConstant.Security.In.HEADER,
							name: "platform"
						},
						timezone: {
							type: SwaggerDefinitionConstant.Security.Type.API_KEY,
							in: SwaggerDefinitionConstant.Security.In.HEADER,
							name: "timezone"
						}
					}
				}
			}));
            // })
            // console.log(this.path,UserRoute.instance)
           this.app.use(this.path, AdminRoute.instance)
           this.app.use(this.path, UserRoute.instance)
            // this.app.use(errorHandler)

            this.app.use(function (request, response, next) {
                response.header("Access-Control-Allow-Origin", "*");
                // res.header("Access-Control-Allow-Credentials", "true");
                response.header("Access-Control-Allow-Headers", "Origin, User-Agent, X-Requested-With, content-type, Content-Type, Accept, authorization, platform, timezone, lang");
                response.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    
                console.log("--------------------------------REQUEST STARTS----------------------------------------");
                console.log(request.originalUrl);
                console.log("Request Type=======>", request.method.toUpperCase());
                console.log("Request Path=======>", request.path);
                console.log("Request Body=======>", request.body);
                console.log("Request Params=====>", request.params);
                console.log("Request Query======>", request.query);
                console.log("Authorization======>", request.headers.authorization);
                console.log("API Key======>", request.headers.api_key);
                console.log("platform===========>", request.headers.platform);
                console.log("timezone===========>", request.headers.timezone);
                console.log("lang===============>", request.headers.lang);
                console.log("--------------------------------REQUEST ENDS------------------------------------------");
    
                if (request.method === "OPTIONS") {
                    response.send(200);
                } else {
                    next();
                }
            });

            this.app.set("views", path.join(__dirname, "views"));
		this.app.use(express.static(path.join(__dirname, "../../public/images")));
		this.app.set("view engine", "ejs");
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

