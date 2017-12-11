module.exports = (app, client) => {
  app.get("/post-message", (req, res) => {
    res.render("post-message", {user:req.session.user})
  }),

  app.post("/post-message", (req, res) => {

  const query ={
    text: `INSERT INTO messages (title, body, user_id)
    SELECT '${req.body.title}', '${req.body.message}', users.id
    FROM users
    WHERE users.username ='${req.session.user.username}'`
  }

  client.query(query, (err, result) => {
    if (err) throw err
  })
  res.redirect("all-messages")
})
}
