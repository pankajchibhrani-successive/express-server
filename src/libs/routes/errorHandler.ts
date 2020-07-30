let error ={
    error: "Not Found",
    message: "error",
    status: 500,
    timestamp: "2019-01-08T17:38:21.929Z"
    }

export let errorHandler= (function (err, req, res, next) {
   console.log(err)

    return res.send(error)
  })

