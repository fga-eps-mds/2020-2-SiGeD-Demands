const Category = require('../Models/CategorySchema');
const validation = require('../utils/validate');

const categoryGet = async (req, res) => {
  const categories = await Category.find();

  return res.json(categories);
};

const categoryCreate = async (req, res) => {
  const { name, description, color } = req.body;

  // Realiza a validação do nome, descrição e cor (Hex)
  const validacao = validation.validate(name, description, color);

  // Verifica a validade dos dados
  if (validacao.length) {
    return res.json({ status: validacao });
  }

  // Cria a categoria
  const categoria = await Category.create({
    name,
    description,
    color,
  });

  return res.json(categoria);
};

const categoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description, color } = req.body;

  // Realiza a validação do nome, descrição e cor (Hex)
  const validacao = validation.validate(name, description, color);

  // Verifica a validade dos dados
  if (validacao.status !== 'valid') {
    return res.json(validacao);
  }

  // Realiza a atualização
  const updateStatus = await Category.findOneAndUpdate({ _id: id }, {
    name,
    description,
    color,
  }, { new: true }, (err, user) => {
    if (err) {
      return res.json(err);
    }
    return res.json(user);
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

  const category = await Category.find({ _id: id });

  return res.json(category);
};

module.exports = {
  categoryGet, categoryCreate, categoryUpdate, categoryDelete, categoryId,
};
