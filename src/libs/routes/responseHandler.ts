"use strict";

import { Response } from "express";

import { HTTP_STATUS_CODE } from "../../constant";

class ResponseHandler {

	constructor() { }

	/** dispatches response from the server */
	async sendSuccess(r: Response, b: IApp.Dispatcher, d: IApp.DataKeys = {}) {
		b.data = d;
		r.status(b.statusCode).json(b);
	}

	/** sends error response after printing on console */
	async sendError(response: Response, error: any) {
		console.log("sendError====================>", error);
		response.status(400).send({ "message": error.message || error, "statusCode": error.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR });
	}
}

export default ResponseHandler;