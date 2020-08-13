
// const asyncHandler = require("../../libs/routes/async");

import {middleware} from "../../libs/routes/authMiddleWare"

import {DAOManager} from "../../entity/baseDao"
// const { validationResult } = require('express-validator/check');

// let callbackfunction= function(req,res,next){
//     return res.send("pppp")
// }

let dao= new DAOManager()
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
      const accessToken = await middleware.generateToken("USER_LOGIN", userObject);
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
    
      let step1 = await dao.findOne("users",{"email":tokenData.email},{},{})

      if(!step1)
      {
        return Promise.reject("EMAIL NOT REGISTERED");
      }

      else{
          return step1
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

}
export const controller = new Controller();
