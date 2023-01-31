const { Router } = require('express');

const sallerController = require('../controllers/seller.controller');
const authorizationUser = require('../midlewares/validateTokenUser.midleware');

const route = Router();

route.get('/seller/orders/:id', authorizationUser, sallerController.getSalesId);
route.put('/seller/orders/:id', authorizationUser, sallerController.updateSale);
route.get('/seller/orders', authorizationUser, sallerController.getSales);

module.exports = route;
