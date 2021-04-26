const moment = require('moment-timezone');
const Alert = require('../Models/AlertSchema');
const validation = require('../Utils/validate');

const alertGet = async (req, res) => {
  const alerts = await Alert.find();

  return res.json(alerts);
};

const alertCreate = async (req, res) => {
  const {
    name, description, date, alertClient, demandID,
  } = req.body;

  const validFields = validation.validateAlert(name, description, date, demandID);

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  try {
    const newAlert = await Alert.create({
      name,
      description,
      date,
      alertClient,
      demandID,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.json(newAlert);
  } catch {
    return res.status(400).json({ error: 'It was not possible to create the alert.' });
  }
};

module.exports = {
  alertGet, alertCreate,
};
