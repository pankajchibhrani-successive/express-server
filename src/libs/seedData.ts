import {DAOManager} from "../entity/baseDao"
const bcrypt = require('bcrypt');
import * as dotenv from "dotenv"
const dao= new DAOManager()
dotenv.config({})
console.log(process.env.password,".........................",process.env.PORT)
export class SeedData {

	

	async bootstrapSeedData() {
        console.log("pankaj....................")
		try {
			const userData = {
				"email": "pkpankajkumar05@gmail.com",
				"password": process.env.password,
				"name": "Pankaj"
            };
			// let hash
			const salt= await bcrypt.genSalt(10)
			const hash =await bcrypt.hash(userData.password,salt)
			userData["salt"] = salt
			userData["hash"] = hash
			const step1 = await dao.findOne("users",{"email":userData.email},{},{})

			if (!step1) dao.saveData("users",userData)
		} catch (error) {
            console.log("error....................",error)
			return Promise.reject();
		}
	}
}