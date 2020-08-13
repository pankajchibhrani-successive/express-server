"use strict";

import { model, Schema, SchemaTypes, } from "mongoose";
import * as mongoose from 'mongoose';


import {genRandomString} from "../../libs/utils"

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
			"ACTIVE","INACTIVE","DELETED"
		],
		default: "ACTIVE"
	},
	created: { type: SchemaTypes.Number, default: Date.now }
}, {
	versionKey: false,
	collection: "users",
	timestamps: true
});

// Load password virtually


export let users: mongoose.Model<IUser.User> = mongoose.model<IUser.User>('users', userSchema);