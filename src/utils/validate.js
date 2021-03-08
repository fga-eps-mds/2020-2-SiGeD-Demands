const validate = (name, description, color) => {
  const regex = /^#([0-9A-F]{3}){1,2}$/;

  // name validation
  if (name === undefined || name.length === 0) {
    return { status: 'invalid name' };
  }

  // description validation
  if (description === undefined || description.length === 0) {
    return { status: 'invalid description' };
  }

  // color validation
  if (!regex.test(color)) {
    return { status: 'invalid color' };
  }

  return { status: 'valid' };
};

module.exports = { validate };
