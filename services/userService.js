const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const validate = require('../utils/validation');



const generateJwt = (id, email, role, firstName, phone) => {
  return jwt.sign(
      {id, email, role, firstName, phone},
      process.env.SECRET_KEY,
      {expiresIn: '25h'})
}

class userService {
  async registration(userData) {
    const {email, password, role, firstName, phone} = userData;

    if (!email || !password) {
      return ApiError.ifBadDataRequest('incorrect email or password');
    }

    const condidate = await User.findOne({where: {email}});
    if (condidate) {
      return ApiError.ifBadDataRequest('user with this email already exists');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, role, firstName, phone, password: hashPassword});
    const basket = await Basket.create({userId: user.id});
    const token = generateJwt(user.id, user.email, user.role, user.firstName, user.phone);
    return {token};
  }

  async login(userData) {
    const {email, password} = userData;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return ApiError.ifBadDataRequest('user with this name was not found');
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return ApiError.ifBadDataRequest('the password is incorrect');
    }
    const token = generateJwt(user.id, user.email, user.role, user.firstName, user.phone);
    return {token, id:user.id, email:user.email, role:user.role, firstName:user.firstName, lastName:user.lastName, phone: user.phone};
  }

  async check(userData) {
    try {
      const answer = generateJwt(userData.id, userData.email, userData.role, userData.firstName, userData.phone)
      return answer;
    } catch (e) {
      console.log(e)
      return {status: "200", massage: "authorization failed"};
    }
  }

  async update(userId, newData) {
    try {
      console.log("newData", newData);
      console.log("userId", userId);
      const user = await User.findOne({where: {id: userId}});
      if(newData.role && user.role !== "ADMIN") return ApiError.internal('you do not have access to change the user\'s role');
      await User.update({...newData}, {where: {id:userId}});
      const token = generateJwt(user.id, user.email, user.role, user.firstName, user.phone);
      return  {token, id:newData.id, email:newData.email, role:newData.role, firstName:newData.firstName, lastName:newData.lastName, phone: newData.phone};

    }catch (e){
      console.log(e);
      return {status: "200", massage: "user not found"};
    }
  }


  // todo implement the role change function
  async changeRole(adminId, userId) {
    const user = await User.findOne({where: {id: userId}});

  }

  async getAll() {

  }

  async delete() {

  }
}

module.exports = new userService();