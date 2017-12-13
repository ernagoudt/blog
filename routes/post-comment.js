module.exports = (app, client) => {
  app.get("/post-comment", (req, res) => {
    res.render("post-comment", {user:req.session.user})
  }),

  app.post("/post-comment", (req, res) => {
  const query ={
    text: `INSERT INTO comments (comment, message_id, user_id)
    SELECT '${req.body.comment}', '${req.body.messageId}', users.id
    FROM users
    WHERE users.id = '${req.session.user.id}'`
  }

  client.query(query, (err, result) => {
    if (err) throw err

  res.redirect("all-messages")

  })
})
}

