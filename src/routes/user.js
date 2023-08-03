const express = require('express')
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
const router = express.Router()
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
const { json } = require('body-parser')

router.get('/', (req, res) => {
    res.send('hello world')
})

router.get('/user/:id', ensureSignedIn, async function (req, res, next) {
    var userId = req.path.split('/user/')[1]
    result = await getUser(userId)
    return res.json(result)
})

router.post('/update-user', currentUser, async (req, res) => {
    const { currentUser } = req
    const parameter = req.body
    const result = await updateUser(parameter, currentUser.email)
    return res.json(result)
})
router.post('/update-password', currentUser, async (req, res) => {
    const { currentUser } = req
    const parameter = req.body
    const password = parameter.password
    const result = await updatePass(password, currentUser.email)
    return res.json(result)
})
router.post('/delete-user', currentUser, async (req, res) => {
    const { currentUser } = req
    const email = currentUser.email
    const result = await deleteUser(email)
    if (result.success) {
        logout(req.session)
        res.clearCookie('token')
    }
    return res.json(result)
})
module.exports = router
