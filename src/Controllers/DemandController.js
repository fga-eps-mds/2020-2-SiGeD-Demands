const moment = require('moment-timezone');
const Demand = require('../Models/DemandSchema');
const validation = require('../utils/validate');

const demandGet = async (req, res) => {
  const demands = await Demand.find();

  return res.json(demands);
};

const demandCreate = async (req, res) => {
  const {
    name, description, process, categoryID, sectorID, clientID,
  } = req.body;
  const validFields = validation.validateDemand(
    name, description, process, categoryID, sectorID, clientID,
  );

  if (validFields.length) {
    return res.json({ status: validFields });
  }

  const newDemand = await Demand.create({
    name,
    description,
    process,
    categoryID,
    sectorID,
    clientID,
    createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  });

  return res.json(newDemand);
};

const demandUpdate = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, process, categoryID, sectorID, clientID,
  } = req.body;

  const validFields = validation.validateDemand(
    name, description, process, categoryID, sectorID, clientID,
  );

  if (validFields.length) {
    return res.json({ status: validFields });
  }

  const updateStatus = await Demand.findOneAndUpdate({ _id: id }, {
    name,
    description,
    process,
    categoryID,
    sectorID,
    clientID,
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  }, { new: true }, (err, user) => {
    if (err) {
      return err;
    }
    return user;
  });

  return res.json(updateStatus);
};

const demandClose = async (req, res) => {
  const { id } = req.params;

  const demandFound = await Demand.findOne({ _id: id });

  let { open } = demandFound;

  if (!validation.validateOpen(open)) {
    return res.status(400).json({ message: 'invalid open value' });
  }

  open = false;

  const updateReturn = await Demand.findOneAndUpdate({ _id: id }, {
    open,
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  },
  { new: true }, (err, demand) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json(demand);
  });
  return updateReturn;
};

const demandId = async (req, res) => {
  const { id } = req.params;

  const demand = await Demand.find({ _id: id });

  return res.json(demand);
};

module.exports = {
  demandGet, demandCreate, demandUpdate, demandClose, demandId,
};
