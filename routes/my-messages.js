module.exports = (app, client) => {
  app.get("/my-messages", (req, res) => {
    const query = {
      text: `SELECT * FROM messages WHERE user_id = (SELECT id FROM users WHERE email = '${req.session.user.email}')`
    }

    client.query(query, (err, result) => {
      if (err) throw err
      var myMessages = result.rows
      res.render("my-messages", {user: req.session.user, myMessages: myMessages})
    })
  })
}
