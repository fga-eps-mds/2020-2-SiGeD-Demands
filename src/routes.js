const express = require('express');
const { verifyJWT } = require('./Utils/functionsJWT');

const routes = express.Router();
const CategoryController = require('./Controllers/CategoryController');
const DemandController = require('./Controllers/DemandController');
const AlertController = require('./Controllers/AlertController');

routes.get('/category', verifyJWT, CategoryController.categoryGet);
routes.get('/category/:id', verifyJWT, CategoryController.categoryId);
routes.post('/category/create', verifyJWT, CategoryController.categoryCreate);
routes.put('/category/update/:id', verifyJWT, CategoryController.categoryUpdate);
routes.delete('/category/delete/:id', verifyJWT, CategoryController.categoryDelete);
routes.get('/demand', verifyJWT, DemandController.demandGet);
routes.get('/demand/:id', verifyJWT, DemandController.demandId);
routes.post('/demand/create', verifyJWT, DemandController.demandCreate);
routes.put('/demand/update/:id', verifyJWT, DemandController.demandUpdate);
routes.put('/demand/sectorupdate/:id', verifyJWT, DemandController.updateSectorDemand);
routes.put('/demand/forward/:id', verifyJWT, DemandController.forwardDemand);
routes.put('/demand/toggle/:id', verifyJWT, DemandController.toggleDemand);
routes.get('/clientsNames', verifyJWT, DemandController.demandGetWithClientsNames);
routes.put('/demand/create-demand-update/:id', verifyJWT, DemandController.createDemandUpdate);
routes.put('/demand/update-demand-update/:id', verifyJWT, DemandController.updateDemandUpdate);
routes.put('/demand/delete-demand-update/:id', verifyJWT, DemandController.deleteDemandUpdate);
routes.get('/statistic/category', verifyJWT, DemandController.demandsCategoriesStatistic);
routes.get('/statistic/sector', verifyJWT, DemandController.demandsSectorsStatistic);
routes.post('/alert/create', verifyJWT, AlertController.alertCreate);
routes.get('/alert', verifyJWT, AlertController.alertGet);

module.exports = routes;
