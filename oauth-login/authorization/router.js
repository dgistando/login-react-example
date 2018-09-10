module.exports = (router, app, authRouteMethod) => {

    //application type has to be urlencoded
    router.post('/register', authRouteMethod.registerUser)

    router.post('/login', authRouteMethod.login)

    return router
}