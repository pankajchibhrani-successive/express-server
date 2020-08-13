export as namespace IUser;

import { Document, Schema } from "mongoose";

export interface User extends Document {
	_id: Schema.Types.ObjectId;
	name: string;
	email: string;
	salt: string;
	hash: string;
	userType: string;
	forgotToken?: string;
	profilePicture?: string;
	status: string;
	created: number;
}

export interface Create {
	email: string;
	password: string;
	name: string;
}
