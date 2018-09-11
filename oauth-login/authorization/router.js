module.exports = (router, passport, authRouteMethod) => {

    //application type has to be urlencoded
    router.post('/register', authRouteMethod.registerUser)

    //still need to add the function that handles password matching
    router.post('/login',  passport.authenticate(
        'local',{
            failureRedirect : '/'
        }
    ) , authRouteMethod.login)

    return router
}