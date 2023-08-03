const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
require('./src/config/index')()

const hour = 1000 * 60 * 60

app.use(
    session({
        secret: 'S@cretKey',
        saveUninitialized: true,
        cookie: { maxAge: hour },
        resave: false,
        name: 'token',
    })
)

app.use(
    cors({
        origin: 'http://localhost:8080',
        credentials: true,
    })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(require('./src/routes'))

app.listen(8081, () => {
    console.log('Server is running on port 8081')
})
