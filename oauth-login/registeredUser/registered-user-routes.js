module.exports = (router, expressApp, registeredUserMethods) => {

    router.post('/enter', expressApp.oauth.authorise(), registeredUserMethods.goToProfile)

}