var users= [
    {
    traineeEmail: 'trainee1@successive.tech',
    reviewerEmail: 'reviewer1@successive.tech',
    }
    ]




    function validateEmail(email){


        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

    }


  console.log(validateEmail(users[0].traineeEmail))
    console.log(validateEmail(users[0].reviewerEmail))
    let validUsers=0, invalidUsers=0

    let a,b

function validateUsers(users){

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

let c =validateUsers(users)
console.log(c)