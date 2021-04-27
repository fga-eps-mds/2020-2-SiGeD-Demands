const moment = require('moment-timezone');
const Alert = require('../Models/AlertSchema');
const validation = require('../utils/validate');

const alertGet = async (req, res) => {
  const alerts = await Alert.find();

  return res.json(alerts);
};

const alertGetByDemandId = async (req, res) => {
  const { demandID } = req.params;

  const filteredAlerts = [];
  const dateNow =  moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DD')).toDate();
  const sevenDaysAfter = moment.utc(moment.tz('America/Sao_Paulo').add(7, 'days').format('YYYY-MM-DD')).toDate();

  try{
    const alerts = await Alert.find({ demandID });
    alerts.map((alert) => { 
      if(moment(alert.date).isSameOrBefore(sevenDaysAfter)){
        if(moment(alert.date).isSameOrAfter(dateNow)){
        filteredAlerts.push(alert);
        }
      }
    });
    return res.status(200).json(filteredAlerts);
  } catch {
    return res.status(400).json({ err: 'Invalid demandID' });
  }
};

const alertGetBySectorId = async (req, res) => {
  const { sectorID } = req.params;

  const filteredAlerts = [];
  const dateNow =  moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DD')).toDate();
  const sevenDaysAfter = moment.utc(moment.tz('America/Sao_Paulo').add(7, 'days').format('YYYY-MM-DD')).toDate();

  try{
    const alerts = await Alert.find({ sectorID });
    alerts.map((alert) => { 
      if(moment(alert.date).isSameOrBefore(sevenDaysAfter)){
        if(moment(alert.date).isSameOrAfter(dateNow)){
        filteredAlerts.push(alert);
        }
      }
    });
    return res.status(200).json(filteredAlerts);
  } catch {
    return res.status(400).json({ err: 'Invalid sectorID' });
  }
};

const alertCreate = async (req, res) => {
  const {
    name, description, date, alertClient, demandID, sectorID,
  } = req.body;

  const validFields = validation.validateAlert(name, description, date, demandID, sectorID);

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
      sectorID,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.json(newAlert);
  } catch {
    return res.status(400).json({ error: 'It was not possible to create the alert.' });
  }
};

module.exports = {
  alertGet, alertCreate, alertGetByDemandId, alertGetBySectorId,
};
