const axios = require('axios');

const { CLIENTS_URL } = process.env;

const APIClients = axios.create({
  baseURL: `http://${CLIENTS_URL}:3002/`,
});

module.exports = {
  APIClients,
};
