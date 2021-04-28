const moment = require('moment-timezone');
const Category = require('../Models/CategorySchema');
const validation = require('../Utils/validate');

const categoryGet = async (req, res) => {
  const categories = await Category.find();

  return res.json(categories);
};

const categoryCreate = async (req, res) => {
  const { name, description, color } = req.body;

  const validFields = validation.validateCategory(name, description, color);

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
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
    return res.status(400).json({ status: validFields });
  }

  try {
    const updateStatus = await Category.findOneAndUpdate({ _id: id }, {
      name,
      description,
      color,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'invalid id' });
  }
};

const categoryDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.deleteOne({ _id: id });

    return res.json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ message: 'failure' });
  }
};

const categoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ _id: id });
    return res.status(200).json(category);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

module.exports = {
  categoryGet, categoryCreate, categoryUpdate, categoryDelete, categoryId,
};
