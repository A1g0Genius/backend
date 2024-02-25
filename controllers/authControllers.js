const User = require('../models/user')
const jwtUtils = require('../utils/jwtService')

exports.loginUser = async (req, res) => {
    const { username, email, password, role } = req.body

    const anyUser = await User.findOne({ where: { username } })

    if (!anyUser) {
        const newUser = await User.create({
            username,
            email,
            password,
            role
        });
    }


    const user = { username }

    const token = jwtUtils.generateToken(user)

    res.status(200).json({ token })
}

