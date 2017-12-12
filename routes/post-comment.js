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
  const query2 = {
    text: `SELECT users.username, comments.comment, comments.message_id
    FROM comments
    LEFT JOIN users
    ON users.id = comments.user_id`
  }

  client.query(query, (err, result) => {
    if (err) throw err
      client.query(query2, (err2, result2) => {
        if (err2) throw err
        var comments = result2.rows
      })

  res.render("all-messages", {comments:comments})

  })
})
}
