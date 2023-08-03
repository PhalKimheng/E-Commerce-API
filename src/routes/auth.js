const {
    register,
    login,
    logout,
    getUser,
    getMe,
    updateUser,
    updatePass,
    deleteUser,
} = require('../services/user')
const jwt = require('jsonwebtoken')
const joiValidation = require('../middleware/joiValidation')
const {
    loginValidation,
    registerValidation,
} = require('../joiValidation/index')
const {
    ensureSignedIn,
    ensureSignedOut,
    currentUser,
} = require('../middleware/authentication')
var express = require('express')
var router = express.Router()

router.get('/me', currentUser, async (req, res) => {
    const { currentUser } = req
    // console.log(currentUser);
    const result = await getMe(currentUser.email)
    return res.json(result)
})
router.post(
    '/register',
    ensureSignedOut,
    joiValidation(registerValidation),
    async (req, res) => {
        const parameter = req.body
        const result = await register(parameter)
        res.json(result)
    }
)
router.post(
    '/login',
    ensureSignedOut,
    joiValidation(loginValidation),
    async (req, res) => {
        const parameter = req.body
        const { email, password } = parameter
        console.log(parameter)
        const result = await login(email, password)
        const token = jwt.sign(parameter, 'S@ecret')
        req.session.jwtToken = token
        res.json(result)
    }
)
router.post('/logout', ensureSignedIn, function (req, res, next) {
    const result = logout(req.session)
    console.log('cookie', req.cookies)
    res.clearCookie('token')
    res.json(result)
})
module.exports = router
