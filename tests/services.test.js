const {getClients} = require('../src/Services/Axios/clientService');
const {APIClients} = require('../src/Services/Axios/baseService');
const jwt = require('jsonwebtoken');

const clients = require('./__mocks__/apiResponses/clients.json')

const { CLIENTS_URL } = process.env;

it('Should get clients', async () => {
  const token = '';
  const res =  await getClients(token);
  expect(res).toEqual(clients);
});
