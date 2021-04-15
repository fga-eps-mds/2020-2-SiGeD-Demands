const moment = require('moment-timezone');
const Demand = require('../Models/DemandSchema');
const validation = require('../utils/validate');

const demandGet = async (req, res) => {
  const { open } = req.query;
  if (open === 'false') {
    const demands = await Demand.find({ open });
    return res.json(demands);
  }
  const demands = await Demand.find({ open: true });

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

  const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
    name,
    description,
    process: process || '',
    categoryID,
    sectorHistory: {
      sectorID,
    },
    clientID,
    userID,
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  }, { new: true }, (err, user) => {
    if (err) {
      return err;
    }
    return user;
  });

  return res.json(updateStatus);
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
  const query = { _id: id }

  try {
    const demand = await Demand.findOne(query);
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
};
