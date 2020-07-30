

this.app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(400).send('Not Found!')
  })