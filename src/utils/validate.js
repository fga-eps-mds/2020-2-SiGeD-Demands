const validate = (name, description, color) => {
  const errors = [];
  // name validation
  if (name === undefined || name.length === 0) {
    errors.push('invalid name');
  }

  // description validation
  if (description === undefined || description.length === 0) {
    errors.push('invalid description');
  }

  // color validation
  if (!/^#([0-9A-F]{3}){1,2}$/.test(color)) {
    errors.push('invalid color');
  }

  return errors;
};

module.exports = { validate };
