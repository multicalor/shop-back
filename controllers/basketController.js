const basketService = require('../services/basketService')
const ApiError = require('../error/ApiError')

class BasketController {
  async create(req, res) {
   const { productIds }  = req.body;
    const { id } = req.user;
    const basket = await basketService.create(productIds, id);
    return res.json(basket);
  }

  async getAll(req, res) {
    const { id } = req.user;
    const basket = await basketService.getAll(id);
    return res.json(basket);
  }

  async update(req, res, next) {
      const { productIds }  = req.body;
      const { id } = req.user;
      const basket = await basketService.update(productIds, id);
      return res.json(basket);
  }

  async buy(req, res) {

  }
}


module.exports = new BasketController();