const express = require('express');
const { verifyJWT } = require('./utils/functionsJWT');
const routes = express.Router();
const CategoryController = require('./Controllers/CategoryController');

routes.get('/category', verifyJWT, CategoryController.categoryGet);
routes.get('/category/:id', verifyJWT, CategoryController.categoryId);
routes.post('/category/create', verifyJWT, CategoryController.categoryCreate);
routes.put('/category/update/:id', verifyJWT, CategoryController.categoryUpdate);
routes.delete('/category/delete/:id', verifyJWT, CategoryController.categoryDelete);

module.exports = routes;
