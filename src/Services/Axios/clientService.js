const { APIClients } = require('./baseService.js');

const getClients = async (token) => {
  try {
    const clients = await APIClients.get('/clients', { headers: { 'x-access-token': token } })
      .then((response) => (response.data));
    return clients;
  } catch (err) {
    console.log(err);
    return { error: 'Could not connect to api_clients' };
  }
};

module.exports = {
  getClients,
};
