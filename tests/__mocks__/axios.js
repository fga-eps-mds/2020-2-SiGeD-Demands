const clients = require('./apiResponses/clients.json')
const user = require('./apiResponses/user.json')

const GET_CLIENTS = '/clients'
const GET_USER_BY_ID = '/users/6089c3538dfebe00555bc17e'

const axios = {
  get: jest.fn((url) => {
    switch (url) {
      case GET_CLIENTS:
        return Promise.resolve({ data: clients });
      case GET_USER_BY_ID:
        return Promise.resolve({ data: user });
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

