const router = require('express').Router();


const categoriesRoutes = require('./categories.routes');
router.use('/categories', categoriesRoutes);

const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

const productsRoutes = require('./products.routes');
router.use('/products', productsRoutes);


module.exports = router;

