let CQLConnection
const crypto = require('crypto')

//Inserts a new user into the database users tables. Random 16 Bytes are stored as salt for the password. 
function insertNewUser(email, password, firstname, lastname, callback){
    var salt = crypto.randomBytes(16).toString('hex')
    
    const insertUserQuery = `INSERT INTO users(email, password, salt, firstname, lastname) VALUES ('${email}', '${setPassword(password,salt)}','${salt}','${firstname}','${lastname}');`

    CQLConnection.execQuery(insertUserQuery, callback)
}

//Get the information user credentials. The salt for the password is gathered then hashed to see if matching
function getUser(username, password, callback){
    
    CQLConnection.execQuery(`SELECT salt FROM users WHERE email = '${username}';`, (result) => {

        const salt = result.result[0].salt

        const getUserQuery = `SELECT * FROM users WHERE email = '${username}' AND password = '${setPassword(password,salt)}';`

        CQLConnection.execQuery(getUserQuery, (userResult) => {
            if(userResult.error) throw error

            const user = userResult.result !== null && userResult.result.length === 1 ? userResult.result[0] : new Error('error getting user');

            callback(false, user)
        })

    })
}

//Checks to see if user exists returns false in a callback if the resuktSet is longer than 0 entries. 
function checkUserExist(email, callback){

    const userExistQuery = `SELECT * FROM users WHERE email = '${email}';`

    CQLConnection.execQuery(userExistQuery, (userResult) => {
        const doesUserExist = userResult.result !== null && userResult.result.length > 0 ? true : false

        callback(userResult.error, doesUserExist)
    })
}

//creates a unique password.
//500 iterations for speed and the hardware is outdated.
//64 is length in bytes of the result 
function setPassword(password, salt){
    return crypto.pbkdf2Sync(password, salt, 500, 64, `sha512`).toString(`hex`)
}

module.exports = (connection) => {
    CQLConnection = connection

    return {
        insertNewUser : insertNewUser,
        getUser : getUser,
        checkUserExist : checkUserExist
    }
}