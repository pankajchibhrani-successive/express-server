

import { Request, Response, NextFunction, Router } from "express";

import { celebrate, Joi } from "celebrate";
import {headerObject} from "../../libs/routes/validator"
// import responseHandler from "../../libs/routes/responseHandler"
import ResponseHandler from "../../libs/routes/responseHandler";
import {controller} from "../../controller/trainee/Controller"

import {middleware} from "../../libs/routes/authMiddleWare" 

// this.router.get("/api/healthCheck", {} );
// router.get("/")
// router.post()
// router.put()
// router.delete()

class AdminRoute extends ResponseHandler{

   public path;
    protected router = Router();
    
    get instance() {
        console.log("3842",this.router)
		return this.router;
    }
    
    constructor(path) {
       super();
       console.log("37288888888888",path)
        this.path = path;
        this.initRoutes();       
    }

    initRoutes(){
        console.log("7832222222222222222222222")
        this.router.post("/login",
        middleware.basicAuth,
        celebrate({
            headers: headerObject["required"],
            body: {
                email: Joi.string()
                    .trim()
                    .lowercase()
                    .email()
                    .regex(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/)
                    .required(),
                password: Joi.string()
                    .trim()
                    .min(3)
                    .max(20)
               //     .default(SERVER.DEFAULT_PASSWORD)
                    .required(),
                deviceId: Joi.string().trim().required(),
                deviceToken: Joi.string().trim().required()
            }
        }, {
            abortEarly: false
        }),
        async (request: Request, response: Response, next: NextFunction) => {
            try {
                const headers = request.headers;
                const payload  = request.body;
                payload.remoteAddress = request.headers["x-forwarded-for"] || request.connection.remoteAddress;
                const result = await controller.login(response);
                return this.sendSuccess(response, "SUCCESS", result);
            } catch (error) {
                return this.sendError(response, error);
            }
        }
    );

    this.router.get("/details",
			celebrate({
				headers: middleware.authorizationHeaderObj
			}, {
				abortEarly: false
			}),
			middleware.adminAuth,
			async (request: Request, response: Response, next: NextFunction) => {
				try {
					const tokenData= response.locals.tokenData;
				//	const result = await adminController.details(response, tokenData);
					return this.sendSuccess(response, "SUCCESS", tokenData);
				} catch (error) {
					return this.sendError(response, error);
				}
			}
		);
    }
}

export default new AdminRoute("/admin");
