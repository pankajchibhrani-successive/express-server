var permission= {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    }
    }

    function hasPermission(moduleName, role,permissionType){
   
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
    console.log(hasPermission('getUsers','', 'delete'))