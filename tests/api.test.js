const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let id;
  const demand = {
    name: 'Nome da Demanda',
    description: 'Descrição da Demanda',
    process: '000000',
    categoryID: '6064ffa9942d5e008c07e61a',
    sectorID: '6064ffa9942d5e008c0734dc',
    clientID: '6054dacb934bd000d7ca623b',
    userID: '60578028cb9349004580fb8d'
  };

  const token = jwt.sign({
    name: "Teste",
    description: "Teste",
    process: '000000',
    categoryID: '000000',
    sectorID: '000000',
    clientID: '000000',
    userID: '000000'
  }, process.env.SECRET, {
    expiresIn: 240,
  });

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Post demand', async (done) => {
    const res = await request(app).post('/demand/create').set('x-access-token', token).send(demand);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(demand.name);
    expect(res.body.description).toBe(demand.description);
    expect(res.body.process).toBe(demand.process);
    expect(res.body.categoryID).toBe(demand.categoryID);
    expect(res.body.sectorID).toBe(demand.sectorID);
    expect(res.body.clientID).toBe(demand.clientID);
    expect(res.body.userID).toBe(demand.userID);
    id = res.body._id;
    done();
  });

  it('Post demand error', async (done) => {
    const errorDemand = {
      name: '',
      description: '',
      process: '',
      categoryID: '',
      sectorID: '',
      clientID: '',
      userID: ''
    };

    const res = await request(app).post('/demand/create').set('x-access-token', token).send(errorDemand);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual([
      'invalid name',
      'invalid description',
      'invalid process',
      'invalid category id',
      'invalid sector id',
      'invalid client id',
      'invalid user id'
    ]);
    done();
  });

  it('Get demand', async (done) => {
    const res = await request(app).get('/demand/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Get id demand', async (done) => {
    const res = await request(app).get(`/demand/${id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(sector.name);
    expect(res.body.description).toBe(sector.description);
    expect(res.body.process).toBe(demand.process);
    expect(res.body.categoryID).toBe(demand.categoryID);
    expect(res.body.sectorID).toBe(demand.sectorID);
    expect(res.body.clientID).toBe(demand.clientID);
    expect(res.body.userID).toBe(demand.userID);
    done();
  });

  it('Get id demand error', async (done) => {
    const res = await request(app).get('/demand/12345678912345').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

it('Close demand', async (done) => {
    const res = await request(app).put(`/demand/close/${id}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message":"success"});
    done();
  });

  it('Close demand error', async (done) => {
    const res = await request(app).put('/demand/close/123456789').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });
});

afterAll(async (done) => {
  done();
});
