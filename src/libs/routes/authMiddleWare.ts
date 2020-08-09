import { Response, Request, NextFunction } from "express";
import { Joi } from "celebrate";
import * as Jwt from "jsonwebtoken";
const cert = "cgfhfj";
const basicAuth = function (request: Request, response: Response, next:NextFunction) {
	console.log(request.headers)
	const isValid: boolean = apiKeyFunction(request?.headers?.api_key);
console.log(isValid,"ppppppppppppppppp")
	// verify the authorization credentials
	if (basicAuthFunction(request.headers.authorization) && isValid) {
		next();
		return {};
	} else {
		return response.status(403).send("You are not authorized to perform this action");
	}
};
export const buildToken = function (params: IApp.TokenData) {
	const userObject: any = {};

	if (params.userId)
		userObject.userId = params.userId;
	if (params.email)
		userObject.email = params.email;
	if (params.name)
		userObject.name = params.name;
	// userObject.platform = params.platform;
	if (params.deviceId)
		userObject.deviceId = params.deviceId;
	// userObject.userType = params.userType;

	return userObject;
};

const authMiddleWare = function (module,permissionType) {
	
};

const authorizationHeaderObj = Joi.object({
	authorization: Joi.string().required().description("Bearer space accessToken"),
	// platform: Joi.string()
	// 	.trim()
	// 	.required()
	// 	.valid([
	// 		DEVICE_TYPE.WEB
	// 	])
	// 	.description("device OS '1'-Android, '2'-iOS, '3'-WEB"),
	// timezone: Joi.number().default("0").required().description("time zone"),
	// language: Joi.string().trim().default("EN").required().valid(["EN"])
}).unknown();


const apiKeyFunction = function (apiKey: any) {
	try {
		console.log(apiKey)
		return apiKey ? (apiKey === "1234") ? true : false : false;
	} catch (error) {
		throw error;
	}
};

const basicAuthFunction = async function (accessToken = "") {
	const credentials = Buffer.from(accessToken, "base64").toString("ascii");
	const [username, password] = credentials.split(":");
	if (username !== "pankaj" || password !== "pankaj@123") { return false; }
	return true;
};
 const generateToken = async (type: string, tokenData) => {
	try {
		
		console.log(tokenData,"329999999999999999",cert,{ algorithm: "HS256", expiresIn: "5m" })
		switch (type) {
			case "USER_LOGIN":
				return await Jwt.sign(tokenData, cert, { algorithm: "HS256", expiresIn: "5m" }); 
			default:
				return {};
		}
	} catch (error) {
		throw error;
	}
};
const adminAuth = async function (request: Request, response: Response, next: NextFunction) {
	try {
//		const isValid: boolean = apiKeyFunction(request.headers.api_key);
//		console.log(isValid,"9000000000",request.headers)
		if (!request.headers.authorization) {
			return response.status(403).send("You are not authorized to perform this action");
		} else {
			console.log("9823982390")
			const authMethod = request.headers.authorization?.split(" ")[0];
			const accessToken = request.headers.authorization?.split(" ")[1];
			if (authMethod !== "Bearer" || !accessToken) {
				return response.status(403).send("You are not authorized to perform this action");
			} else {
				const jwtPayload: any = await decodeToken(accessToken, response);
				// const isExpire = isTimeExpired(jwtPayload.payload.exp * 1000);
				// if (isExpire) {
				// 	await loginHistoryDao.removeDeviceById({ "userId": jwtPayload.payload.userId, "deviceId": jwtPayload.payload.deviceId });
				// }
				let tokenData: any = await verifyToken(response, { accessToken });
				console.log("tokendata......................",tokenData)
				response.locals.tokenData= tokenData
				next();
				return {}
				// let adminData: any = await adminDaoV1.findAdminById({ "userId": tokenData.userId });
				// if (!adminData) {
				// 	return Promise.reject(ERROR.COMMON(response.locals.lang).INVALID_TOKEN);
				// }
				// delete adminData._id; delete adminData.createdAt;
				// if (adminData.status === STATUS.BLOCKED) {
				// 	return Promise.reject(ERROR.COMMON(response.locals.lang).BLOCKED);
				// }
				//  else {
				// 	const step1 = await loginHistoryDao.findDeviceById({ "userId": tokenData.userId, "deviceId": tokenData.deviceId });
				// 	if (!step1) {
				// 		return Promise.reject(ERROR.COMMON(response.locals.lang).SESSION_EXPIRED);
				// 	}
				// 	adminData = _.extend(adminData, { "deviceId": tokenData.deviceId, "platform": tokenData.platform, "userId": tokenData.userId });
				// 	response.locals.tokenData = { ...tokenData, ...adminData };
				// 	next();
				// 	return {};
				// }
			}
		}
	} catch (error) {
		throw error;
	}
};
const userAuth = async function (request: Request, response: Response, next: NextFunction) {
	try {
//		const isValid: boolean = apiKeyFunction(request.headers.api_key);
//		console.log(isValid,"9000000000",request.headers)
		if (!request.headers.authorization) {
			return response.status(403).send("You are not authorized to perform this action");
		} else {
			console.log("9823982390")
			const authMethod = request.headers.authorization?.split(" ")[0];
			const accessToken = request.headers.authorization?.split(" ")[1];
			console.log(authMethod,accessToken)
			if (authMethod !== "Bearer" || !accessToken) {
				return response.status(403).send("You are not authorized to perform this action");
			} else {
				const jwtPayload: any = await decodeToken(accessToken, response);
				// const isExpire = isTimeExpired(jwtPayload.payload.exp * 1000);
				// if (isExpire) {
				// 	await loginHistoryDao.removeDeviceById({ "userId": jwtPayload.payload.userId, "deviceId": jwtPayload.payload.deviceId });
				// }
				let tokenData: any = await verifyToken(response, { accessToken });
				console.log("tokendata......................",tokenData)
				response.locals.tokenData= tokenData
				next();
				return {}
				// let adminData: any = await adminDaoV1.findAdminById({ "userId": tokenData.userId });
				// if (!adminData) {
				// 	return Promise.reject(ERROR.COMMON(response.locals.lang).INVALID_TOKEN);
				// }
				// delete adminData._id; delete adminData.createdAt;
				// if (adminData.status === STATUS.BLOCKED) {
				// 	return Promise.reject(ERROR.COMMON(response.locals.lang).BLOCKED);
				// }
				//  else {
				// 	const step1 = await loginHistoryDao.findDeviceById({ "userId": tokenData.userId, "deviceId": tokenData.deviceId });
				// 	if (!step1) {
				// 		return Promise.reject(ERROR.COMMON(response.locals.lang).SESSION_EXPIRED);
				// 	}
				// 	adminData = _.extend(adminData, { "deviceId": tokenData.deviceId, "platform": tokenData.platform, "userId": tokenData.userId });
				// 	response.locals.tokenData = { ...tokenData, ...adminData };
				// 	next();
				// 	return {};
				// }
			}
		}
	} catch (error) {
		throw error;
	}
};

const verifyToken = async function (response: Response, params: any) {
	try {
		return await Jwt.verify(params.accessToken, cert, { algorithms: ["HS256"] });
		
	} catch (error) {
		console.log("verifyToken=======================>", error);
		return _verifyTokenError(response, error);
	}
};

const _verifyTokenError = async function (response: Response, error: any) {
	if (error.name === "TokenExpiredError") {
		return Promise.reject("Your session is expired");
	} else if (error.name !== "TokenExpiredError") {
		return Promise.reject("Token is invalid");
	} else {
		return {};
	}
};
const decodeToken = async function (accessToken: string, response: Response) {
	try {
		const jwtPayload = await Jwt.decode(accessToken, { complete: true });
		if (!jwtPayload) {
			return Promise.reject("Your token is invalid,unauthorized access");
		} else {
			return jwtPayload;
		}
	} catch (error) {
		console.log("decodeToken=======================>", error);
		return Promise.reject("Your token is invalid");
	}
};
export  let middleware= {

	basicAuth,
	adminAuth,
	userAuth,
	generateToken,
	buildToken,
	authorizationHeaderObj
}