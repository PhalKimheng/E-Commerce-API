const Jwt = require('jsonwebtoken')
const ensureSignedIn = (req, res, next) => {
    if (!req.session.jwtToken) {
        return res.json({
            success: false,
            error:`You must sign in`
        })
    }
    next();
}

const ensureSignedOut = (req, res, next) => {
    if (req.session.jwtToken) {
        return res.json({
            success: false,
            error: `You have already signed in`
        })
    }
    next();
}
const currentUser = (req, res, next) => {
    if (!req.session.jwtToken)
      throw "You must sign in~"
    const user = Jwt.verify(req.session.jwtToken, 'S@ecret')
    req.currentUser = user;
    next()
}

module.exports = {
    ensureSignedIn,
    ensureSignedOut,
    currentUser
}