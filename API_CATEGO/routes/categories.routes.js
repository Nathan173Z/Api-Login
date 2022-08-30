const categoriesRoutes = require('express').Router();
const categories = require('../controllers/categories.controller');
const { validaToken } = require('../middlewares/auth');

categoriesRoutes.get("/all", validaToken, categories.findAll);

categoriesRoutes.get("/show/:id", validaToken, categories.findOne);

categoriesRoutes.post("/create", validaToken,categories.create);

categoriesRoutes.put("/update", validaToken, categories.update);

categoriesRoutes.delete("/delete/:id", validaToken, categories.delete);

module.exports = categoriesRoutes;