module.exports = (app, client) => {
app.get("/all-messages", (req, res) => {
  const query = {
    text: `SELECT messageuser.username AS messageusername,
    commentusers.username AS commentusername,
    messageuser.body AS messagebody,
    messageuser.title AS messagetitle,
    commentusers.comment AS comment,
    messageuser.id,
    commentusers.message_id

    FROM

      ( SELECT users.username, messages.title, messages.body, messages.id
      FROM messages
      LEFT JOIN users
      ON users.id = messages.user_id
      ) AS messageuser

    LEFT JOIN

      ( SELECT array_agg(users.username) AS username,
      array_agg(comments.comment) AS comment,
      comments.message_id
      FROM comments
      LEFT JOIN users
      ON users.id = comments.user_id
      GROUP BY comments.message_id
      ) AS commentusers

    ON commentusers.message_id = messageuser.id`
  }

  client.query(query, (err, result) => {
    if (err) throw err
    var allMessages = result.rows

    res.render("all-messages", {allMessages:allMessages, user:req.session.user})
  })
})
}
