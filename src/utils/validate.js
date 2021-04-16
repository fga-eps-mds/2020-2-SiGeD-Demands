const validateOpen = (open) => {
  const regex = /^(true|false)$/;
  return regex.test(open);
};

const validateSectorID = (sectorID) => {
  const errors = [];
  if (!sectorID) {
    errors.push('invalid sectorID');
  }
  return errors;
};

const validateCategory = (name, description, color) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  } if (!description) {
    errors.push('invalid description');
  } if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

const validateDemand = (
  name, description, categoryID, sectorID, clientID, userID,
) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  } if (!description) {
    errors.push('invalid description');
  } if (categoryID.length === 0) {
    errors.push('invalid category id');
  } if (!sectorID) {
    errors.push('invalid sector id');
  } if (!clientID) {
    errors.push('invalid client id');
  } if (!userID) {
    errors.push('invalid user id');
  }

  return errors;
};

const validateDemandUpdate = (
  userName, description, visibilityRestriction, userSector,
) => {
  const errors = [];

  if (!userName) {
    errors.push('invalid userName');
  } if (!description) {
    errors.push('invalid description');
  } if (!validateOpen(visibilityRestriction)) {
    errors.push('invalid visibilityRestriction');
  } if (!userSector) {
    errors.push('invalid sector');
  }

  return errors;
};

module.exports = {
  validateCategory,
  validateDemand,
  validateOpen,
  validateDemandUpdate,
  validateSectorID,
};
