const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await User.findOne({_id: decoded.id});
    next();
  } catch (err) {
    if(err instanceof jwt.TokenExpiredError){
      res.status(401).send({message: "Session Expired !!!"});
    }else{
      res.status(401).send({message: "Unauthorized !!!"});
    }
  }
};

module.exports = verifyToken;