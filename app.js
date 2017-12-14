const express = require('express')
const app = express()
const session = require('express-session');
const pg = require("pg")
const Client = pg.Client
const bodyParser = require("body-parser")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

app.use(session({
    secret: 'adfadfadfa',
    resave: true,
    saveUnininitialize: true
}))

require('dotenv').load();
const client = new Client({
    user: process.env.username,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 5432
})

require("./routes/index.js")(app, client)
require("./routes/sign-up.js")(app, client)
require("./routes/login.js")(app, client)
require("./routes/logout.js")(app)
require("./routes/post-message.js")(app, client)
require("./routes/my-messages.js")(app, client)
require("./routes/post-comment.js")(app, client)

client.connect((err) => console.log(err))

app.listen(process.env.webport, () => {
    console.log("listening to port", process.env.webport)
});
