"use strict";

import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

// import { SERVER } from "@config/environment";

export class CheckForPassword {

	@ApiModelProperty({
		description: "email",
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: "string@gmail.com" as any
	})
	public email: string;

	@ApiModelProperty({
		description: "password",
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: "pankaj" as any
	})
	public password: string;

}

export const AuthResponseJson = {
	200: {
		description: "Success",
		// model: "admin",
		type: SwaggerDefinitionConstant.Response.Type.OBJECT
	},
	400: {
		description: "Validation Error",
		type: SwaggerDefinitionConstant.Response.Type.OBJECT
	},
	401: {
		description: "Unauthorized",
		type: SwaggerDefinitionConstant.Response.Type.OBJECT
	},
	500: {
		description: "Internal Server",
		type: SwaggerDefinitionConstant.Response.Type.OBJECT
	}
};