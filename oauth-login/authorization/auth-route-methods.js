let dbHelper

/**
 * 
 * Checks to see if the user exists. If not the user is added to the db
 * with the credentials given.
 * 
 * If a user is already in the database then that error is passed back to the user.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function registerUser(req, res){
    //this method might need to change depeding on the application
    //dbHelper.checkUserExist(req.body.username, (error, checkUserExist) => {
        console.log("body: ", req.body)
        // //could be a sql problem or extant user
        // if(error !== null || checkUserExist){

        //     console.log(error)

        //     const message = error !== null ? "sql error" : "user alreayd exists"

        //     console.log(" error message: ", message,"    use: ", req.body)

        //     sendResponse(res, message, error)

        //     return
        // }
        const doTheyExist = userExists(req.body.email)
        if(!doTheyExist){

            const password = req.body.password
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const email = req.body.email

            
            //Nothing errored out so we can register the new user
            dbHelper.insertNewUser(email, password, firstname, lastname, (result) => {
                const message = result.error === null ? "registration successful" : "registration fialed"

                console.log(message)

                sendResponse(res, message, result.error)
            })

        }else if(doTheyExist instanceof Error){
            sendResponse(res, doTheyExist, error)
        }else{
            console.log("user already exists")
            sendResponse(res, "sorry that user already exists", error)
        }

    //})
}


//This really depends on the aplication
function login(req, res){

    const doTheyExist = userExists(req.body.email)
    if(doTheyExist){
        dbHelper.getUser(req.body.username, req.body.password, (doMore, user) => {
            if(user instanceof Error) throw err

            req.login(user.id, (err)=>{
                res.redirect('/')
            })
        })
    }else if(doTheyExist instanceof Error){
        sendResponse(res, doTheyExist, error)
    }else{
        sendResponse(res, "The user doesnt exist", error)
    }
}

function userExists(email){

    let doThey

    dbHelper.checkUserExist(email, (error, checkUserExist) => {
        //there was an error
        if(error !== null){
            throw error
            return new Error("There was a db error checking user")
        }

        //if user exists
        doThey = checkUserExist
    })
    return doThey
}


function sendResponse(res, message, error){
    res.status(error == null ? 400 : 200)
    .json({
        'message' : message,
        'error' : error
    })
}

module.exports = (userDbHelper) => {

    dbHelper = userDbHelper

    return {
        registerUser : registerUser,
        login : login
    }
}
