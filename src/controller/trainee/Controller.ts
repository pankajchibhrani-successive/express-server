
const asyncHandler = require("../../libs/routes/async");
// const { validationResult } = require('express-validator/check');

// let callbackfunction= function(req,res,next){
//     return res.send("pppp")
// }
export class Controller{

  async login(payload){   
    try{
      return payload
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
