const productsRoutes = require('express').Router();
const products = require('../controllers/products.controller')

productsRoutes.get('/all', products.findAll)
productsRoutes.get('/all/pages', products.findAllPages)
productsRoutes.get('/show/:id', products.findOne)
productsRoutes.post('/create', products.create)
productsRoutes.put('/update', products.update)
productsRoutes.delete('/delete/:id', products.delete)



module.exports = productsRoutes