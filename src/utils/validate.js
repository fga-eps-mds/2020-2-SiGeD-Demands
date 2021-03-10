const validate = (name, description, color) => {
  const errors = [];
  // name validation
  if (!name) {
    errors.push('invalid name');
  }

  // description validation
  if (!description) {
    errors.push('invalid description');
  }

  // color validation
  if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

module.exports = { validate };
