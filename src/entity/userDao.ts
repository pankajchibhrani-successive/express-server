// "use strict";

// import { Model } from "mongoose";

// import UserModel from "../repositories/user/UserModel";
// import {DAOManager} from "../entity/baseDao";
// // import { STATUS } from "@config/index";

// class UserDao extends DAOManager {



// 	/**
// 	 * @function isEmailExists
// 	 */
// 	async isEmailExists(params: any, tokenData: IApp.TokenData) {
// 		const query: any = {};
// 		query.email = params.email;
// 		if (tokenData.userId) {
// 			query._id = { "$not": { "$eq": tokenData.userId } };
// 		}
// 		query.status = { "$ne": "DELETED" };

// 		const projection = { createdAt: 0, updatedAt: 0 };
// 		const options = { lean: true };

// 		return await this.findOne(query, projection, options, {});
// 	}

// 	/**
// 	 * @function findUserById
// 	 */
// 	async findUserById(params: IApp.UserId) {
// 		const query: any = {};
// 		query._id = params.userId;
// 		query.status = { "$ne": "DELETED"};

// 		const projection = { createdAt: 0, updatedAt: 0 };
// 		const options = { lean: true };

// 		return await this.findOne(query, projection, options, {}, {});
// 	}

// 	/**
// 	 * @function createUser
// 	 */
// 	async createUser(params: IUser.Create): Promise<IUser.User> {
// 		return await this.save(params);
// 	}
// }

// export const userDao = new UserDao(UserModel);