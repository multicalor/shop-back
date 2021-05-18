const { body, validationResult } = require('express-validator');
const EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const PHONE = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/

module.exports = function (req, res, next) {
  try{
    const {email, phone } = req.body;
    console.log(email, phone)
    console.log("validation----->", EMAIL.test(email), PHONE.test(phone));
    if(email){
      if (!EMAIL.test(email)) {
        throw "incorrect email";
      }
    }

    if(phone){
      if (!PHONE.test(phone)) {
        throw "incorrect phone";
      }
    }

    next();
  }
    catch (e) {
    console.log(e)
    res.status(200).json({status:200, message: e})
  }
}
