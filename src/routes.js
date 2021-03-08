const express = require('express');

const routes = express.Router();
const CategoryController = require('./Controllers/CategoryController');

routes.get('/category', CategoryController.categoryGet);
routes.get('/category/:id', CategoryController.categoryId);
routes.post('/category/create', CategoryController.categoryCreate);
routes.put('/category/update/:id', CategoryController.categoryUpdate);
routes.delete('/category/delete/:id', CategoryController.categoryDelete);

module.exports = routes;
