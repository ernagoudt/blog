module.exports = (app, client) => {
app.get("/all-messages", (req, res) => {
  const query = {
    text: `SELECT messages.id, messages.title, messages.body, messages.user_id, users.username
    FROM messages
    INNER JOIN users
    ON messages.user_id = users.id`
  }

  client.query(query, (err, result) => {
    if (err) throw err
    var allMessages = result.rows
    /*console.log(result.rows)*/

    res.render("all-messages", {
      title: "Bulletin Board",
      allMessages:allMessages,
      user:req.session.user
    })
  })
})
}
