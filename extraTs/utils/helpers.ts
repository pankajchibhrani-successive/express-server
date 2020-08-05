
    export function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

    }

    let validUsers = 0;
   let invalidUsers = 0;

    let a;
    let b;
   export function validateUsers(users: any) {

    for (const i of this.users.length) {
        [a, b] = [users[i].traineeEmail, users[i].reviewerEmail];  // destructring

        if (validateEmail(a)) {
            validUsers++;
        }
        else {
            invalidUsers++;
        }

        if (validateEmail(b)) {
            validUsers++;
        }
        else {
            invalidUsers++;
        }

    }
return {validUsers, invalidUsers};

    }


export function hasPermission(moduleName: string, role: string, permissionType: string, permission: any ) {

    if (Object.keys(permission)[0]  === moduleName) {

        if (permission[moduleName].hasOwnProperty(permissionType)) {

            if ((permissionType === 'all' && permission[moduleName].all[0] === role)  ||
            (permissionType === 'read' && (permission[moduleName].read[0] === role   || permission[moduleName].read[1] === role)) ||
            (permissionType === 'write' && permission[moduleName].write[0] === role) ||
            (permissionType === 'delete' &&    permission[moduleName].delete[0] === role)) {
               return true;
           }
           else {
               return false;
           }

        }
        else {
            return false;
        }

    }

    else {
        return false;
    }
}

// let c =validateUsers(users)
// console.log(c)