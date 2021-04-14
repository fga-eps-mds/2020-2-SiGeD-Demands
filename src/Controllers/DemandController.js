const moment = require('moment-timezone');
const axios = require('axios');
const Demand = require('../Models/DemandSchema');
const validation = require('../utils/validate');

const getClients = async () => {
  console.log('teste');
  try {
    return await axios.get('http://localhost:3002/clients', { headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU0ZDBhODY1MzkwMDAzZjdmYWMwNSIsImlhdCI6MTYxODM3Mjc3MSwiZXhwIjoxNjE4NDcyNzcxfQ.FALksCdiYUExSF0eNeJF1II0NOoOl8MYr5lYGmxpUYY' } });
  } catch (error) {
    return error.json(error);
  }
};

const demandGetWithClientsNames = async (req, res) => {
  console.log('open');
  const open = true;
  const demandsWithClients = [];
  let demands = [];
  console.log(open, 'open');

  if (open === 'false') {
    demands = await Demand.find({ open }).populate('categoryID');
  } else {
    demands = await Demand.find({ open: true }).populate('categoryID');
    return res.json('Teste');
  }

  demandsWithClients[0] = Object.assign(clients[0], demands[0]);

  return res.json(demandsWithClients);
};

const demandGetByClientId = async (req, res) => {
  const { clientID } = req.params;

  try {
    const demand = await Demand.find({ clientID }).populate('categoryID');
    return res.status(200).json(demand);
  } catch (error) {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const demandGet = async (req, res) => {
  const { open } = req.query;
  if (open === 'false') {
    const demands = await Demand.find({ open }).populate('categoryID');
    return res.json(demands);
  }
  const demands = await Demand.find({ open: true }).populate('categoryID');

  return res.json(demands);
};

const demandCreate = async (req, res) => {
  const {
    name, description, process, categoryID, sectorID, clientID, userID,
  } = req.body;

  const validFields = validation.validateDemand(
    name, description, categoryID, sectorID, clientID, userID,
  );
  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  const newDemand = await Demand.create({
    name,
    description,
    process: process || '',
    categoryID,
    sectorHistory: {
      sectorID,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    },
    clientID,
    userID,
    createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  });

  return res.json(newDemand);
};

const demandUpdate = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, process, categoryID, sectorID, clientID, userID,
  } = req.body;

  const validFields = validation.validateDemand(
    name, description, categoryID, sectorID, clientID, userID,
  );

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  try {
    const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
      name,
      description,
      process,
      categoryID,
      sectorID,
      clientID,
      userID,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'invalid id' });
  }
};

const toggleDemand = async (req, res) => {
  const { id } = req.params;

  try {
    const demandFound = await Demand.findOne({ _id: id });

    let { open } = demandFound;

    open = !demandFound.open;

    const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
      open,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (demand) => demand);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const demandId = async (req, res) => {
  const { id } = req.params;
  try {
    const demand = await Demand.findOne({ _id: id }).populate('categoryID');
    return res.status(200).json(demand);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const updateSectorDemand = async (req, res) => {
  const { id } = req.params;

  const {
    sectorID,
  } = req.body;

  const validFields = validation.validateSectorID(
    sectorID,
  );

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  try {
    const demandFound = await Demand.findOne({ _id: id });

    demandFound.sectorHistory[
      demandFound.sectorHistory.length - 1
    ].sectorID = sectorID;

    demandFound.sectorHistory[
      demandFound.sectorHistory.length - 1
    ].updatedAt = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();

    const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
      sectorHistory: demandFound.sectorHistory,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const forwardDemand = async (req, res) => {
  const { id } = req.params;

  const {
    sectorID,
  } = req.body;

  const validField = validation.validateSectorID(
    sectorID,
  );

  if (validField.length) {
    return res.status(400).json({ status: validField });
  }

  try {
    const demandFound = await Demand.findOne({ _id: id });

    demandFound.sectorHistory = demandFound.sectorHistory.push({
      sectorID,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });

    const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
      sectorHistory: demandFound.sectorHistory,
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const createDemandUpdate = async (req, res) => {
  const { id } = req.params;

  const {
    userName, userSector, description, visibilityRestriction,
  } = req.body;

  const validFields = validation.validateDemandUpdate(
    userName, description, visibilityRestriction,
  );

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  try {
    const demandFound = await Demand.findOne({ _id: id });

    demandFound.updateList = demandFound.updateList.push({
      userName,
      userSector,
      description,
      visibilityRestriction,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });

    const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
      updateList: demandFound.updateList,
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

module.exports = {
  demandGet,
  demandCreate,
  demandUpdate,
  toggleDemand,
  demandId,
  updateSectorDemand,
  forwardDemand,
  createDemandUpdate,
  demandGetByClientId,
  demandGetWithClientsNames,
};
