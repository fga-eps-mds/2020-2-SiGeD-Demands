const axios = require('axios');

const { CLIENTS_URL, USERS_URL } = process.env;

const APIClients = axios.create({
  baseURL: `http://${CLIENTS_URL}:3002/`,
});

const APIUsers = axios.create({
  baseURL: `http://${USERS_URL}:3001/`,
});

module.exports = {
  APIClients,
  APIUsers
};
