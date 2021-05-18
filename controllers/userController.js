const userService = require('../services/userService')
const ApiError = require('../error/ApiError');
const validate = require('../utils/validation');

class UserController {
  async registration(req, res) {
    try {
      const answer = await userService.registration(req.body)
      return res.json(answer);
    } catch (e) {
      res.status(200).json({message: e.status})
    }
  }

  async login(req, res) {
    console.log(req.query);
    console.log(req.body);
    const userInfo = await userService.login(req.body);
    return res.json(userInfo);
  }

  async check(req, res) {
      let {user} = req;
      const token = await userService.check(user);
      res.json({token})
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
      res.status(500).json({message: newUserData })//newUserData.status
    }
  }

  //todo implement the role change function
  async changeRole(req, res) {
    let { newData } = req.body;
    let { user } = req;
    const newUserData = await userService.update(user.id, newData);
    res.json({newUserData})
  }

  async getAll(req, res) {
    let { newData } = req.body;
    let { user } = req;
    const newUserData = await userService.update(user.id, newData);
    res.json({newUserData})
  }

  async delete(req, res) {

  }

}
module.exports = new UserController();