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
        console.log("body: ", req.body)

        // req.checkBody('username', 'Username field cannot be empty.').notEmpty();
        // req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
        // req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
        // req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
        // req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
        // req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        // req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
        // req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

        // // Additional validation to ensure username is alphanumeric with underscores and dashes
        // req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');



    userExists(req.body.email, (doTheyExist) => {

        if(!doTheyExist){

            const password = req.body.password
            const firstname = req.body.firstName
            const lastname = req.body.lastName
            const email = req.body.email

            //Nothing errored out so we can register the new user
            dbHelper.insertNewUser(email, password, firstname, lastname, (result) => {
                const message = result.error === null ? "registration successful" : "registration fialed"

                console.log(message)

                //sendResponse(res, message, result.error)

                req.login(email, (err) => {
                    console.log("Inside login function")
                    res.send({isAuthenticated : true})
                })
            })

        }else if(doTheyExist instanceof Error){
            sendResponse(res, -1, doTheyExist)
        }else{
            console.log("user already exists")
            sendResponse(res, "sorry that user already exists", null)
        }
    })
}


//This really depends on the aplication
function login(req, res){

    userExists(req.body.email, doTheyExist => {
        if(doTheyExist){
            dbHelper.getUser(req.body.username, req.body.password, (doMore, user) => {
                if(user instanceof Error) throw user

                

                req.login(user.email, (err)=>{
                    res.send({isAuthenticated : true})
                })
            })
        }else if(doTheyExist instanceof Error){
            sendResponse(res, -1, doTheyExist)
        }else{
            res.redirect('/')
            //sendResponse(res, "The user doesnt exist", null)
        }
    })
}

function userExists(email, callback){

    dbHelper.checkUserExist(email, (error, checkUserExists) => {
        //there was an error
        if(error !== null){
            throw error
            callback(new Error("There was a db error checking user"))
        }

        //if user exists
        callback(checkUserExists)
    })
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
