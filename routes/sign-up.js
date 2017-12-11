module.exports = (app, client) => {
  app.get("/sign-up", (req, res) => {
    res.render("sign-up")
  }),

  app.post("/sign-up", (req, res) => {
  const query1 = {
    text: `SELECT * FROM users WHERE username = ('${req.body.username}')`
  }

  const query2 = {
    text: `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`
  }

  client.query(query1, (err, result) => {
    if (err) throw err
    if (result.rows.length !== 0){
      console.log("username already exists")
    }
    else {
      client.query(query2, (err, result) => {
        if (err) throw err
      })
    }
  })
  res.render("sign-up")
  })
}
