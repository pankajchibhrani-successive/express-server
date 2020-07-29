//import * as constants from "../constants"
// var users= [
//     {
//     traineeEmail:constants.traineeEmail,
//     reviewerEmail: constants.reviewerEmail,
//     }
//     ]
import * as validateUsers from "./helpers"
import * as validateEmail from "./helpers"


module.exports={
validateEmail,validateUsers
}
// console.log(validationEmail.validateEmail("ss"))
// function validateUsers(users){

//     for(let i=0;i<users.length;i++){


//         [a,b]= [users[i].traineeEmail,users[i].reviewerEmail]  // destructring

//         if(validateEmail(a)){
//             validUsers++
//         }
//         else{
//             invalidUsers++
//         }


//         if(validateEmail(b)){
//             validUsers++
//         }
//         else{
//             invalidUsers++
//         }

//     }
// return {validUsers,invalidUsers}
   
// }

// let c =validateUsers(users)
// console.log(c)