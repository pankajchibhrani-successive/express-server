
    export function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

    }

    let validUsers=0, invalidUsers=0

    let a,b
   export function validateUsers(users){

    for(let i=0;i<users.length;i++){


        [a,b]= [users[i].traineeEmail,users[i].reviewerEmail]  // destructring

        if(validateEmail(a)){
            validUsers++
        }
        else{
            invalidUsers++
        }


        if(validateEmail(b)){
            validUsers++
        }
        else{
            invalidUsers++
        }

    }
return {validUsers,invalidUsers}
   
}


export default  function hasPermission(moduleName, role,permissionType,permission){
   
    if(Object.keys(permission)[0]  == moduleName){

        if(permission[moduleName].hasOwnProperty(permissionType)){

            if((permissionType == 'all' && permission[moduleName].all[0] == role)  ||
            (permissionType == 'read' && (permission[moduleName].read[0] == role   || permission[moduleName].read[1] == role)) ||
            (permissionType == 'write' && permission[moduleName].write[0]==role) ||
            (permissionType == 'delete' &&    permission[moduleName].delete[0] == role))
           {
               return true
           }
           else{
               return false
           }

        }
        else{
            return false
        }
        
    }

    else {
        return false
    }
}

// let c =validateUsers(users)
// console.log(c)