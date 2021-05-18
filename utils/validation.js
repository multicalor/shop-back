const { body, validationResult } = require('express-validator');
const EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const PHONE = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ // /^\+?[0-9]{12}$/

class Validation {
  email (email) {
    try {
    if (!EMAIL.test(email)) {
      throw "incorrect email";
    }
    } catch (e) {
    return e
    }
  }
  phone (phone) {
    try {
      if (!PHONE.test(phone)) {
        throw "incorrect phone";
      }
    } catch (e) {
      return e
    }
  }
}

module.exports = new Validation();
// module.exports = function (req, res, next) {
//   try{
//     const {email, phone } = req.body;
//     console.log("validation----->", EMAIL.test(email), PHONE.test(phone));
//     if (!EMAIL.test(email)) {
//       throw "incorrect email";
//     }
//     if (!PHONE.test(phone)) {
//       throw "incorrect phone";
//     }
//     next();
//   } catch (e) {
//     console.log(e)
//     res.status(200).json({status:200, message: e})
//   }
// }
