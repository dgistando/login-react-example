const port = 8000

const fs = require('fs')
const crypto = require('crypto')

const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'))
const cqlConnection = require('./dbHelpers/db-connection')(config.username, config.password, config.contactPoints, config.options)
const CassandraStore = require('cassandra-store')
const sessionOptions = {
    "table": "sessions",
    "client": cqlConnection.client,
    "clientOptions": {
        "contactPoints": config.contactPoints,
        "keyspace": config.options.keyspace,
        "queryOptions": {
            "prepare": true
        }
    }
}


const accessToken = require('./dbHelpers/db-handle-tokens')(cqlConnection)
const userDb = require('./dbHelpers/db-handle-user')(cqlConnection)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const session = require('express-session')
const cookieParser = require('cookie-parser')

const passport = require('passport')
//add passport-local
//app.set('trus proxy', 1) for https


const authRouteMethods = require('./authorization/auth-route-methods')(userDb)
const authRouter = require('./authorization/router')(express.Router(), passport, authRouteMethods)


//----------------Middleware------------------\\

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret: crypto.randomBytes(16).toString('hex'),
    resave: false,//only saves session only when a change is made
    saveUninitialized: true, //only creates the session for logged in users
    //cookie: { secure: true } for https
    store : new CassandraStore(sessionOptions)
  }))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

//--------------------------------------------\\
app.use('/auth', authRouter)

const path = require('path')
//This way if authenticated it should take you to the
//profile page straight away
app.get('/', (req, res) => {
    console.log('user: ',req.user)
    console.log('authenticated: ', req.isAuthenticated())
    
    res.sendFile(path.join(__dirname, '/oauth-login/public/', 'index.html'))
})

//Added a post version of the same thing
//for use elsewher
app.get('/checkAuth', (req, res) => {
    if(req.isAuthenticated()){
        res.send({isAuthenticated : true})
        return;
    }

    res.send({isAuthenticated : false})
})

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/oauth-login/', 'bundle.js' ))
})

app.listen(port, () => {
   console.log(`listening on port ${port}...`)
})