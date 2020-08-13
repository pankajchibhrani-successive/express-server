

import { Joi } from "celebrate";

export const headerObject = {
	"required": Joi.object({
		platform: Joi.string()
			.required().valid("1","2","3")
			.description("device OS '1'-Android, '2'-iOS, '3'-WEB"),
		timezone: Joi.number().default("0").required().description("time zone"),
		// language: Joi.string().trim().default("EN").required().valid(["EN"])
	}).unknown(),

	
	// "optional": Joi.object({
	// 	platform: Joi.string()
	// 		.trim()
	// 		.optional()
	// 		.valid([
	// 			"1","2","3"
	// 		])
	// 		.description("device OS '1'-Android, '2'-iOS, '3'-WEB").error((errors: any) => {
	// 			errors.forEach((err: { type: any; message: string; }) => {
	// 				switch (err.type) {
	// 					case "any.empty":
	// 						err.message = "Platform is required.";
	// 						break;
	// 					case "any.required":
	// 						err.message = "Platform is required.";
	// 						break;
	// 					default:
	// 						break;
	// 				}
	// 			});
	// 			return errors;
	// 		}),
	// 	timezone: Joi.number().default("0").optional().description("time zone")
	// }).unknown()
};
