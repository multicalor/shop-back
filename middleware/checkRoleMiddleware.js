const jwt = require('jsonwebtoken')

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; //Bearer fvbdfgdfgdf
      if (!token) {
        return res.status(401).json({message: "you are not authorized"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if(decoded.role !== role){
        console.log(role, decoded.role)
        return res.status(403).json({message: "you have no access"})
      }
      console.log(decoded)
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({message: "you are not authorized"})
    }
  };
}
