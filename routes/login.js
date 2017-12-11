module.exports = (app, client) => {
  app.get("/login", (req, res) => {
    res.render("login")
  }),

  app.post("/login", (req, res) => {
    const query1 = {
      text: `SELECT * FROM users
      WHERE username = '${req.body.username}' AND password = '${req.body.password}'`
    }

    client.query(query1, (err, result) => {
      if (err) throw err;
      if (result.rows.length !== 0) {
        req.session.user = result.rows[0];
        console.log('User', result.rows[0].username, 'just logged in.')
        res.render("post-message", {user: req.session.user})
      } else {
        res.send("login failed")
      }
    })
  })
}
