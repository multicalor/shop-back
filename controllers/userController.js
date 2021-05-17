const userService = require('../services/userService')
const ApiError = require('../error/ApiError');

class UserController {
  async registration(req, res) {
    const answer = await userService.registration(req.body)
    return res.json(answer);
  }

  async login(req, res) {
    const userInfo = await userService.login(req.body);
    return res.json({userInfo});
  }

  async check(req, res) {
      let {user} = req;
      const token = await userService.check(user);
      res.json({token})
  }

  async update(req, res) {
    let { newData } = req.body;
    let { user } = req;
    let newUserData;
    try {
    newUserData = await userService.update(user.id, newData);

    res.json({newUserData})
    }catch (e){
      console.log(e);
      res.status(500).json({message: newUserData.status})
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