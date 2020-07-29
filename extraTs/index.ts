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

import  {validate} from "./utils/validation"
// import  {validateEmail,validateUsers} from "./utils/helpers"
import {permission} from "./utils/permission"

import {CONSTANT} from "./constants"
// console.log(hasPermission('getUsers',undefined, 'delete'))

console.log(validate.validateEmail(CONSTANT.users[0].reviewerEmail))
console.log(validate.validateUsers(CONSTANT.users))
// console.log(validation.validation.validateUsers(CONSTANT.users))
// console.log(validateEmail(CONSTANT.users[0].reviewerEmail))


console.log(permission.hasPermission("getUsers","trainer","write",CONSTANT.permission))

