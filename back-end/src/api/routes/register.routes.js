const { Router } = require('express');

const registerController = require('../controllers/register.controller');

const route = Router();

route.post('/register', registerController.register);
route.get('/user', registerController.getAllUser);

module.exports = route;
