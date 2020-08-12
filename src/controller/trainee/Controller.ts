
// const asyncHandler = require("../../libs/routes/async");
import {
	ApiPath, ApiOperationPost, ApiOperationGet
} from "swagger-express-ts";
import {middleware} from "../../libs/routes/authMiddleWare"
import { DAOManager } from "../../entity/baseDao";
const dao= new DAOManager()
const bcrypt = require('bcrypt');
import { AuthResponseJson } from "../../controller/user/user.route.schema";

// import {userDao} from "../../entity/userDao"
// const { validationResult } = require('express-validator/check');

// let callbackfunction= function(req,res,next){
//     return res.send("pppp")
// }

@ApiPath({
	name: "User",
	path: "/user",
	// security: { apiKeyHeader: [] }
})
export class Controller{

  async login(payload){   
    try{
      return payload
    }
    catch(error){
      throw error
    }
    
  }

  async generateToken(payload){   
    try{
      console.log(payload)
      const userObject = middleware.buildToken(payload);
      let tokenData = {
        id: payload.userId,
        email: payload.email,
        timestamp: Date.now(),
        tokenType: "LOGIN"
      };
      const accessToken = await middleware.generateToken("USER_LOGIN", tokenData);
      console.log("access..................",accessToken)
      return accessToken

    }
    catch(error){
      throw error
    }
  }

  async checkforUser(tokenData){   
    try{
      console.log(tokenData)
    
      let step1 = await dao.findOne("users",{"_id": tokenData.id},{},{})

      
     if(!step1){
       return Promise.reject("User does not exist")
     }
     return step1
    }
    catch(error){
      throw error
    }
  }

  

  @ApiOperationPost({
		description: "User Check for Password",
		// summary: "",
		path: "/checkForPassword",
		parameters: {
			body: {
				description: "Password Check",
				model: "CheckForPassword",
				required: true
			}
		},

		security: {
			//  apiKeyHeader: [],
			  //  basicAuth: [],
			  //  platform:[],
			  //  timezone:[]
		},
		responses: AuthResponseJson
  })
  

  async checkforPassword(payload){   
    try{
      console.log(payload)
      
      let step1 = await dao.findOne("users",{"email": payload.email},{},{})

      // const salt= await bcrypt.genSalt(10)
      console.log(payload.password)
      console.log(step1)
      if(!step1){
        return Promise.reject("User does not exist")
      }
      
    //   bcrypt.compare(payload.password, step1.hash, function(err, result) {
    //    if(result){
    //      console.log("true.................")
    //       return Promise.resolve("PASSWORD matched")
    //    }
    //    else{
    //     return Promise.reject("Password does not match")
    //    }
    //     // result == true
    // });
      const hash =await bcrypt.hash(payload.password,step1.salt)
      console.log(hash)
      if(step1.hash  === hash){
      return Promise.resolve("PASSWORD matched")
      }
      else{
        return Promise.reject("Password does not match")
      }

     
    }
    catch(error){
      throw error
    }
  }

    // async post(){
    //     return "post"
    // }
    // async put(){
    //     return "put"
    // }

    // async delete(){
    //     return "delete"
    // }
// }
async Pagination(payload,tokenData){   
  try{
   
    const { pageNo, limit, searchKey, sortBy, sortOrder } = payload;
    const aggPipe = [];
    
    const match: any = {};
    
          if (searchKey) {
            match["$or"] = [
              { "email": { "$regex": searchKey, "$options": "-i" } },
              { "name": { "$regex": searchKey, "$options": "-i" } },
            ];
          }
          aggPipe.push({ "$match": match });
          const project = {
            _id: 1, email:1,name:1
          };

          aggPipe.push({ "$project": project });

    let sort = {};
    if (sortBy && sortOrder) {
      if (sortBy === "email") {
        sort = { "email": sortOrder };
      }else if (sortBy === "name") {
        sort = { "name": sortOrder };
      }
        else {
        sort = { "createdAt": sortOrder };
      }
    } else {
      sort = { "createdAt": sortOrder };
    }
    aggPipe.push({ "$sort": sort });

    let result= await dao.paginate("users", aggPipe, limit, pageNo);
    return result
  }
  catch(error){
    throw error
  }
}
}
export const controller = new Controller();
