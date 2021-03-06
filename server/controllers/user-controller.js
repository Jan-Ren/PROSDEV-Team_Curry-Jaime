const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../db/index')
const jsonwebtoken = require('jsonwebtoken');

getJWT = (req, res) => {
    const token = jsonwebtoken.sign({ user: 'johndoe' }, require('../db').secretOrKey)

    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
}

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
            const token = jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 28800 }, // 8hours in seconds
                (err, token) => {                    
                    res.json({
                        success: true,
                        token,
                        user,
                    });
                    
                }
            );
            res.cookie('token', token, {
                // domain: "localhost",
                httpOnly: true
            });
            // res.cookie('token', token);
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

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getAllUser = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

getUser = async (req, res) => {
    const token = req.body.token

    if (!token) 
        res.status(400).json({ msg: "No token, authorization denied" });

    try {
        // Verify token
        const decodedUser = jwt.verify(token, keys.secretOrKey);
        // const decodedUser = jwt_decode(token)

        // Add user to payload
        req.user = decodedUser;
        
        const user = await User.findById({ _id: decodedUser.id }).select('-password')
        return res.status(200).json({ success: true, data: user })
        // next();
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Token is not valid" })
    }
}

updatePassword = async (req, res) => {
    const { password, isAdmin, new_password } = req.body
    
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await User.findOne({isAdmin: isAdmin}, async (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        //Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);     
        
        if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(new_password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: user._id,
                        message: 'User updated!',
                    })
                                })
                                .catch(error => {
                                return res.status(404).json({
                                error,
                                message: 'User not updated!',
                                })
                            })
                    })
                });
        } else {
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        
        });    
}

updatePRFFolder = async (req, res) => {

    const { password, isAdmin } = req.body

    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({isAdmin: isAdmin}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.prf_folder = body.prf_folder
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'PRF Folder updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'PRF Folder  not updated!',
                })
            })
    })
}

updatePOFolder = async (req, res) => {

    const { password, isAdmin } = req.body
    
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({isAdmin: isAdmin}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.po_folder = body.po_folder
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'PO Folder updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'PO Folder  not updated!',
                })
            })
    })
}
module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    deleteUser,    
    getAllUser,
    getUser,
    updatePassword,
    updatePRFFolder,
    updatePOFolder
}