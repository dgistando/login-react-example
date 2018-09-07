const port = 8000

const fs = require('fs')
const crypto = require('crypto')

const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'))
const cqlConnection = require('./dbHelpers/db-connection')(config.username, config.password, config.contactPoints, config.options)

const accessToken = require('./dbHelpers/db-handle-tokens')(cqlConnection)
const userDb = require('./dbHelpers/db-handle-user')(cqlConnection)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const session = require('express-session')
const cookieParser = require('cookie-parser')

const passport = require('passport')

//app.set('trus proxy', 1) for https


const authRouteMethods = require('./authorization/auth-route-methods')(userDb)
const authRouter = require('./authorization/router')(express.Router(), app, authRouteMethods)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//Add express validator here


app.use('/auth', authRouter)



app.use(cookieParser())
app.use(session({
    secret: crypto.randomBytes(16).toString('hex'),
    resave: false,//only saves session only when a change is made
    saveUninitialized: true, //only creates the session for logged in users
    //cookie: { secure: true } for https
  }))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

app.listen(port, () => {
   console.log(`listening on port ${port}...`)
})