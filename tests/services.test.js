const {getClients} = require('../src/Services/Axios/clientService');
const {getUser} = require('../src/Services/Axios/userService');
const jwt = require('jsonwebtoken');

const clients = require('./__mocks__/apiResponses/clients.json')
const user = require('./__mocks__/apiResponses/user.json')

const { CLIENTS_URL, USERS_URL } = process.env;

it('Should get clients', async () => {
  const token = '';
  const res =  await getClients(token);
  expect(res).toEqual(clients);
});

it('Should get user', async () => {
  const token = '';
  const id = '6089c3538dfebe00555bc17e'
  const res =  await getUser(id, token);
  expect(res).toEqual(user);
});
