
const validateOpen = (open) => {
  const regex = /^(true|false)$/;
  return regex.test(open);
};

const validateProcess = (process) => {
  const regex = /^[0-9]+$/;
  return regex.test(process);
}

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

const validateDemand = (name, description, process, category, sector) => {
  const errors = [];

  if (!name){
    errors.push('invalid name');
  } if (!description){
    errors.push('invalid description');
  } if (!process){
    errors.push('invalid process');
  } if (!category){
    errors.push('invalid category');
  } if (!sector){
    errors.push('invalid sector');
  }

  return errors;
};

module.exports = { validateCategory, validateDemand, validateOpen };
