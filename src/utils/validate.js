const validate = (name, description, color) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  }

  if (!description) {
    errors.push('invalid description');
  }

  if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

module.exports = { validate };
