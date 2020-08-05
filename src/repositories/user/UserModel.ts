"use strict";

import { model, Schema, SchemaTypes } from "mongoose";

import { DB_MODEL_REF, STATUS, USER_TYPE, SERVER } from "@config/index";
import { genRandomString, encryptHashPassword } from "@utils/appUtils";

const userSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true, auto: true },
	name: { type: SchemaTypes.String, trim: true, required: true },
	email: { type: SchemaTypes.String, trim: true, index: true, lowercase: true, required: true },
	salt: { type: SchemaTypes.String, required: false },
	hash: { type: SchemaTypes.String, required: false },
	
	//forgotToken: { type: SchemaTypes.String, required: false },
	//profilePicture: { type: SchemaTypes.String, required: false },
	status: {
		type: SchemaTypes.String,
		enum: [
			STATUS.BLOCKED,
			STATUS.UN_BLOCKED,
			STATUS.DELETED
		],
		default: STATUS.UN_BLOCKED
	},
	created: { type: SchemaTypes.Number, default: Date.now }
}, {
	versionKey: false,
	collection: "users",
	timestamps: true
});

// Load password virtually
userSchema.virtual("password")
	.get(function () {
		return this._password;
	})
	.set(function (password: string) {
		this._password = password;
		const salt = this.salt = genRandomString(SERVER.SALT_ROUNDS);
		this.hash = encryptHashPassword(password, salt);
	});

export default model<IUser.User>("users", userSchema);