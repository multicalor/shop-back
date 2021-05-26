const basketService = require('../services/basketService')
const ApiError = require('../error/ApiError')

class BasketController {
  async create(req, res) {
    const { id } = req.user;
    const {coast, products} = await basketService.create(req.body, id);
    return res.json({coast, products});
  }

  async getAll(req, res) {
    const { id } = req.user;
    const {coast, products} = await basketService.getAll(id);
    return res.json({coast, products});
  }

  async update(req, res) {
      const productsInfo  = req.body;
      const { id } = req.user;
      const {coast, products} = await basketService.update(productsInfo, id);
      return res.json({coast, products});
  }

  async addOne(req, res) {
    const { productId, quantity }  = req.body;
    const { id } = req.user;
    const basket = await basketService.addOne(productId, quantity, id);
    return res.json(basket);
  }


//todo complete function
  async removeOne(req, res) {
    const { productId }  = req.body;
    console.log("req.body",req.body)
    const { id } = req.user;
    const basket = await basketService.removeOne(productId, id);
    return res.json(basket);
  }

  // async updateOne(req, res) {
  //   const { oldProductId, newProduct }  = req.body;
  //   const { id } = req.user;
  //   const basket = await basketService.updateOne(oldProductId, newProduct , id);
  //   return res.json(basket);
  // }
}


module.exports = new BasketController();