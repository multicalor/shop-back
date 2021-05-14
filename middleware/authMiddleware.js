const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; //Bearer fvbdfgdfgdf
    if (!token) {
      return res.status(401).json({message: "Не авторизован"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    console.log('decoded------>', decoded)
    next();
  } catch (e) {
    res.status(401).json({message:err.message})
  }
};

