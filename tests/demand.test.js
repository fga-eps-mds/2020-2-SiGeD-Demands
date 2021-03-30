const request = require('supertest');
const { it } = require('@jest/globals');
const app = require('../src/index');

describe('Demands post test', () => {
  it('should create a new demand', async () => {
    const res = await request(app)
      .post('/demand/create')
      .send({
        "name": "categoria",
        "description": "descricao",
        "process": "19",
        "category": "Categoria",
        "sector": "sector"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message);
  }),

  it('should create a new demand', async () => {
    const res = await request(app)
      .post('/demand/create')
      .send({
        "name": "categoria",
        "description": "descricao",
        "process": "19",
        "category": "Categoria",
        "sector": "sector"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message);
  });

});
