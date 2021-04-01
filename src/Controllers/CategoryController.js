const moment = require('moment-timezone');
const Category = require('../Models/CategorySchema');
const validation = require('../utils/validate');

const categoryGet = async (req, res) => {
  const categories = await Category.find();

  return res.json(categories);
};

const categoryCreate = async (req, res) => {
  const { name, description, color } = req.body;

  const validFields = validation.validateCategory(name, description, color);

  if (validFields.length) {
    return res.json({ status: validFields });
  }

  const newCategory = await Category.create({
    name,
    description,
    color,
    createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  });

  return res.json(newCategory);
};

const categoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description, color } = req.body;

  const validFields = validation.validateCategory(name, description, color);

  if (validFields.length) {
    return res.json({ status: validFields });
  }

  const updateStatus = await Category.findOneAndUpdate({ _id: id }, {
    name,
    description,
    color,
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  }, { new: true }, (err, user) => {
    if (err) {
      return err;
    }
    return user;
  });

  return res.json(updateStatus);
};

const categoryDelete = async (req, res) => {
  const { id } = req.params;

  const deleteStatus = await Category.deleteOne({ _id: id });

  if (deleteStatus.deletedCount !== 1) {
    return res.json({ message: 'failure' });
  }

  return res.json({ message: 'success' });
};

const categoryId = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOne({ _id: id });

  return res.json(category);
};

module.exports = {
  categoryGet, categoryCreate, categoryUpdate, categoryDelete, categoryId,
};
