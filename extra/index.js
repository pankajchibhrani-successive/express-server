// import * as hasPermission from "./utils/permission"

// import  {validateEmail,validateUsers} from "./utils/helpers"
// import  {validateEmail,validateUsers} from "./utils/helpers"


// import {CONSTANT} from "./constants"
// // console.log(hasPermission('getUsers',undefined, 'delete'))

// console.log(CONSTANT,validateEmail)

// console.log(validateEmail(CONSTANT.users[0].traineeEmail))
// console.log(validateUsers(CONSTANT.users))
// // console.log(validateEmail(users[0].reviewerEmail))



// import * as hasPermission from "./utils/permission"

import  {validateEmail,validateUsers} from "../extra/utils/validation"
// import  {validateEmail,validateUsers} from "./utils/helpers"
import hasPermission from "../extra/utils/permission"

import {CONSTANT} from "./constants"
// console.log(hasPermission('getUsers',undefined, 'delete'))

console.log(validateEmail.validateEmail(CONSTANT.users[0].traineeEmail))
console.log(validateUsers.validateUsers(CONSTANT.users))
// console.log(validateEmail(users[0].reviewerEmail))
console.log(hasPermission("getUsers","trainer","write",CONSTANT.permission))