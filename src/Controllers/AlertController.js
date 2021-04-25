const moment = require('moment-timezone');
const Alert = require('../Models/AlertSchema');
const validation = require('../utils/validate');

const alertGet = async (req, res) => {
    const alerts = await Alert.find();
  
    return res.json(alerts);
};

const alertCreate = async (req, res) => {
    const { name, description, date, alertClient } = req.body;

    console.log(name, description, date, alertClient);

    const validFields = validation.validateAlert(name, description, date);
  
    if (validFields.length) {
        return res.status(400).json({ status: validFields });
    }

    const newAlert = await Alert.create({
      name,
      description,
      date,
      alertClient,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
  
    return res.json(newAlert);
  };
  

module.exports = {
   alertGet, alertCreate,
};