const userService = require('../services/userService')
const ApiError = require('../error/ApiError');
const validate = require('../utils/validation');

class UserController {
  async getUser(req, res) {
    let {user} = req;
    const {token, userInfo, coast, products} = await userService.getUser(user);
    return res.status(200).json({token, userInfo, coast, products});
    // 400 Bad Request («неправильный, некорректный запрос»)[2][3][4];
    // 401 Unauthorized («не авторизован (не представился)»)[2][3];
    // 404 Not Found («не найдено»)[2][3];
    // 501 Not Implemented («не реализовано»)[2][3];
    //   418 I’m a teapot («я — чайник»);
  }

  async registration(req, res) {
    try {
      const answer = await userService.registration(req.body)
      return res.json(answer);
    } catch (e) {
      return res.status(200).json({message: e.status})
    }
  }

  async login(req, res) {
    const userInfo = await userService.login(req.body);
    return res.json(userInfo);
  }

  async check(req, res) {
      let {user} = req;
      const token = await userService.check(user);
      return res.json({token})
  }

  async update(req, res) {
    let newData = req.body;
    let { user } = req;
    let newUserData;
    try {
      newUserData = await userService.update(user.id, newData);

      res.json(newUserData)
    }catch (e){
      console.log(e);
      return res.status(500).json({message: newUserData })//newUserData.status
    }
  }

  //todo implement the role change function
  async changeRole(req, res) {
    let { newData } = req.body;
    let { user } = req;
    const newUserData = await userService.update(user.id, newData);
    return res.json({newUserData})
  }

  async getAll(req, res) {
    let { newData } = req.body;
    let { user } = req;
    const newUserData = await userService.update(user.id, newData);
    return res.json({newUserData})
  }

  async delete(req, res) {

  }

}
module.exports = new UserController();