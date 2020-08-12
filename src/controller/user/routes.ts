import { Request, Response, NextFunction, Router } from "express";

import { celebrate, Joi } from "celebrate";
import {headerObject} from "../../libs/routes/validator"
// import responseHandler from "../../libs/routes/responseHandler"
import ResponseHandler from "../../libs/routes/responseHandler";
import {controller} from "../../controller/trainee/Controller"
import {middleware} from "../../libs/routes/authMiddleWare" 
import {DAOManager} from "../../entity/baseDao"

const dao= new DAOManager()

class UserRoute extends ResponseHandler{

   public path;
    protected router = Router();
    
    get instance() {
        // console.log("3842",this.router)
		return this.router;
    }
    
    constructor(path) {
       super();
    //    console.log("37288888888888",path)
        this.path = path;
        this.initRoutes();       
    }

    initRoutes(){
        // console.log("7832222222222222222222222")
      
        this.router.post("/generateToken",
        // middleware.basicAuth,
        celebrate({
            // headers: headerObject["required"],
            body: {
                email: Joi.string()
                    .trim()
                    .lowercase()
                    .email()
                    .regex(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/)
                    .required(),
                userId: Joi.string()
                    .regex(/^[a-f\d]{24}$/i)
                    .required(),
                
            }
        }, {
            abortEarly: false
        }),
        async (request: Request, response: Response, next: NextFunction) => {
            try {
                // const headers = request.headers;
                const payload = request.body;
                console.log("812999999933339")
                // payload.remoteAddress = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
                const result:any = await controller.generateToken(payload);
                return this.sendSuccess(response,{"statusCode":200,"message":"SUCCESS"}, result)
            } catch (error) {
                return this.sendError(response, error);
            }
        }
    );

        
        this.router.post("/checkForUser",
        //  middleware.authorizationHeaderObj,
        celebrate({
             headers: middleware.authorizationHeaderObj,
             
            // body: {
            //     email: Joi.string()
            //         .trim()
            //         .lowercase()
            //         .email()
            //         .regex(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/)
            //         .required(),
            //     userId: Joi.string()
            //         .regex(/^[a-f\d]{24}$/i)
            //         .required(),
                
            // }
        }, {
            abortEarly: false
        }),
        middleware.userAuth,
        async (request: Request, response: Response, next: NextFunction) => {
            try {
                // const headers = request.headers;
                const tokenData: IApp.TokenData = response.locals.tokenData;

                // payload.remoteAddress = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
                const result:any = await controller.checkforUser(tokenData);
                return this.sendSuccess(response,{"statusCode":200,"message":"SUCCESS"}, result)
            } catch (error) {
                return this.sendError(response, error);
            }
        }
    );

    this.router.post("/user/checkforPassword",
    celebrate({
        
     //   headers: middleware.authorizationHeaderObj,
            body: {
                email: Joi.string()
                    .trim()
                    .lowercase()
                    .regex(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/)
                    .required(),
                password: Joi.string()
                    .required(),
                
            }
        
    }, {
        abortEarly: false
    }),

//    middleware.userAuth,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const payload= request.body
            // const tokenData= response.locals.tokenData;
            const result:any = await controller.checkforPassword(payload);
            return this.sendSuccess(response,{"statusCode":200,"message":"SUCCESS"}, result)
        } catch (error) {
            return this.sendError(response, error);
        }
    }
);

this.router.post("/user/pagination",
celebrate({
    
 //   headers: middleware.authorizationHeaderObj,
        query: {
                    pageNo: Joi.number().required().description("Page no"),
					limit: Joi.number().required().description("limit"),
					searchKey: Joi.string().optional().description("Search by email and name"),
					sortBy: Joi.string().trim().lowercase().valid("email","name").optional().description("email and name"),
					sortOrder: Joi.number().optional().valid(1, -1).description("1 for asc, -1 for desc"),
            
        }
    
}, {
    abortEarly: false
}),

   middleware.userAuth,
async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload= request.body
        const tokenData= response.locals.tokenData;
        const result:any = await controller.Pagination(payload,tokenData);
        return this.sendSuccess(response,{"statusCode":200,"message":"SUCCESS"}, result)
    } catch (error) {
        return this.sendError(response, error);
    }
}
);

    this.router.get("/user/details",
			celebrate({
				headers: middleware.userAuth
			}, {
				abortEarly: false
			}),
			middleware.userAuth,
			async (request: Request, response: Response, next: NextFunction) => {
				try {
					const tokenData= response.locals.tokenData;
					return this.sendSuccess(response, {"statusCode":200,"message":"SUCCESS"}, tokenData);
				} catch (error) {
					return this.sendError(response, error);
				}
			}
		);
    }
}

export default new UserRoute("");
