const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../db/index')

loginUser = async (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a password',
        })
    }

    const { password, isAdmin } = req.body

    await User.findOne( {isAdmin: isAdmin}, async (err, user) => {
        if (err)
            return res.status(400).json({ success: false, error: err })
        
        if (!user) 
            return res.status(404).json({ success: false, error: `User not found` })
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);        
        
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 28800 }, // 8hours in seconds
                (err, token) => {
                    res.json({
                        success: true,
                        token,
                        user
                    });
                }
            );
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }

        // return res.status(200).json({ success: true, data: user })
    })

}

logoutUser = async (req, res) => {

}

registerUser = (req, res) => {
    const { password, isAdmin } = req.body
    const newUser = new User({
        password,
        isAdmin
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
    });    
    // return res.send("etits")
}

getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
}

module.exports = {
    loginUser,
    logoutUser,
    registerUser,    
    getUser
}