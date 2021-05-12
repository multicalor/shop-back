const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign(
      {id, email, role},
      process.env.SECRET_KEY,
      {expiresIn: '25h'})
}

class UserController {
  async registration(req, res, next) {
    const {email, password, role} = req.body;

    if (!email || !password) {
      console.log(!email || !password)
      return next(ApiError.badRequest('Некоректный email или password'));
    }

    const condidate = await User.findOne({where: {email}});
    if (condidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует.'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, role, password: hashPassword});
    const basket = await Basket.create({userId: user.id});
    const token = generateJwt(user.id, user.email, user.role);
    return res.json(token);
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    console.log('user---->', user.dataValues);
    if (!user) {
      return next(ApiError.internal('Пользователь с таким имененм не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  }

  async check(req, res, next) {
    console.log(req.user)
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.json(token)
  }
}
module.exports = new UserController();