const basketService = require('../services/basketService')
const ApiError = require('../error/ApiError')

class BasketController {
  async create(req, res) {
    const { id } = req.user;
    const basket = await basketService.create(req.body, id);
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

  async addOne(req, res) {
    const { productId }  = req.body;
    const { id } = req.user;
    const basket = await basketService.addOne(productId, id);
    return res.json(basket);
  }


//todo complete function
  async removeOne(req, res) {
    const { basketItemId }  = req.body;
    const { id } = req.user;
    const basket = await basketService.removeOne(basketItemId, id);
    return res.json(basket);
  }
}


module.exports = new BasketController();