const jwtUtils = require('../utils/jwtService')

// i haven't used it 
const authenticate = (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' })
    }
    try {
        const decoded = jwtUtils.verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = authenticate 
