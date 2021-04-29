const clients = require('./apiResponses/clients.json')
const GET_CLIENTS = '/clients'

const axios = {
  get: jest.fn((url) => {
    switch (url) {
      case GET_CLIENTS:
        return Promise.resolve({ data: clients }); 
      default:
        return Promise.resolve({ data: { error: `Mock URL ${url} not found` }});
    }
  }),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

module.exports = axios;

