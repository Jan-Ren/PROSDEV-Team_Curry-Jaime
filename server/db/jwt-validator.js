const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const key = require('./index').secretOrKey

dotenv.config()
module.exports = auth = (req, res, next) => {
  const token = req.cookies.token || ''
  console.log(token)

  if (!token) 
    res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decodedUser = jwt.verify(token, key);

    // Add user to payload
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" })
  }
  
}