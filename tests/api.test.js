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
  const falseDemand = {
    name: 'Nome da Demanda',
    description: 'Descrição da Demanda',
    process: '000000',
    categoryID: '6064ffa9942d5e008c07e61a',
    sectorID: '6064ffa9942d5e008c0734dc',
    clientID: '6054dacb934bd000d7ca623b',
    userID: '60578028cb9349004580fb8d',
    open: false
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

  it('Post false demand', async (done) => {
    const res = await request(app).post('/demand/create').set('x-access-token', token).send(falseDemand);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(falseDemand.name);
    expect(res.body.description).toBe(falseDemand.description);
    expect(res.body.process).toBe(falseDemand.process);
    expect(res.body.categoryID).toBe(falseDemand.categoryID);
    expect(res.body.sectorID).toBe(falseDemand.sectorID);
    expect(res.body.clientID).toBe(falseDemand.clientID);
    expect(res.body.userID).toBe(falseDemand.userID);
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
    expect(res.body.name).toBe(demand.name);
    expect(res.body.description).toBe(demand.description);
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
    const res = await request(app).put(`/demand/toggle/${id}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body.categoryID).toBe(demand.categoryID);
    expect(res.body.name).toBe(demand.name);
    expect(res.body.clientID).toBe(demand.clientID);
    expect(res.body.process).toBe(demand.process);
    expect(res.body.sectorID).toBe(demand.sectorID);
    expect(res.body.userID).toBe(demand.userID);
    expect(res.body.description).toBe(demand.description);
    done();
  });

  it('Get false demand', async (done) => {
    const res = await request(app).get('/demand?open=false').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].categoryID).toBe(falseDemand.categoryID);
    expect(res.body[0].name).toBe(falseDemand.name);
    expect(res.body[0].clientID).toBe(falseDemand.clientID);
    expect(res.body[0].process).toBe(falseDemand.process);
    expect(res.body[0].sectorID).toBe(falseDemand.sectorID);
    expect(res.body[0].userID).toBe(falseDemand.userID);
    expect(res.body[0].description).toBe(falseDemand.description);
    expect(res.body[0].open).toBe(false);
    done();
  });

  it('Close demand error', async (done) => {
    const res = await request(app).put('/demand/toggle/123456789').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

  const category = {
    name: 'Nome da Categoria',
    description: 'Descrição da Demanda',
    color: '#000000'
  };

  it('Post category', async (done) => {
    const res = await request(app).post('/category/create').set('x-access-token', token).send(category);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(category.name);
    expect(res.body.description).toBe(category.description);
    expect(res.body.color).toBe(category.color);
    category_id = res.body._id;
    done();
  });

  it('Post category error', async (done) => {
    const errorCategory = {
      name: '',
      description: '',
      color: ''
    };

    const res = await request(app).post('/category/create').set('x-access-token', token).send(errorCategory);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid name', 'invalid description', 'invalid color']);
    done();
  });

  it('Get category', async (done) => {
    const res = await request(app).get('/category/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Get id category', async (done) => {
    const res = await request(app).get(`/category/${category_id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(category.name);
    expect(res.body.description).toBe(category.description);
    expect(res.body.color).toBe(category.color);
    done();
  });

  it('Get id category error', async (done) => {
    const res = await request(app).get('/category/12345678912345678912345').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

  it('Update category', async () => {
    const category = {
        name: "porte de arma",
        description: "avaliação psicológica",
        color: "#000000"
    };

    const res = await request(app)
    .put(`/category/update/${category_id}`)
    .set('x-access-token', token)
    .send(category);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(category.name);
    expect(res.body.description).toBe(category.description);
    expect(res.body.color).toBe(category.color);
});

it('Update category error', async () => {
    const category = {
        name: "",
        description: "Jest description",
        color: "#000000"
    }

    const res = await request(app)
    .put(`/category/update/${category_id}`)
    .set('x-access-token', token)
    .send(category);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual([ 'invalid name' ]);
});

it('Update with invalid id', async () => {
    const category = {
        name: "porte de arma",
        description: "avaliação psicológica",
        color: "#000000"
    };

    const res = await request(app)
    .put(`/category/update/123abc`)
    .set('x-access-token', token)
    .send(category)
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe('invalid id')
});

it('Update sector without token', async () => {
    const sector = {
        name: "Jest test",
        description: "Jest description",
        color: "#000000"
    }

    const res = await request(app)
    .put(`/category/update/${category_id}`)
    .send(sector);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'No token was provided' });
});

it('Update category with invalid token', async () => {
    const tokenFalho = 'abc123';
    const category = {
        name: "Jest test",
        description: "Jest description",
        color:  "#000000"
    }

    const res = await request(app)
    .put(`/category/update/${category_id}`)
    .set('x-access-token', tokenFalho)
    .send(category);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ auth: false, message: 'It was not possible to authenticate the token.' });
});

it('Delete category', async (done) => {
    const res = await request(app).delete(`/category/delete/${category_id}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message":"success"});
    done();
  });

  it('Delete category error', async (done) => {
    const res = await request(app).delete('/category/delete/09876543210987654321').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message":"failure"});
    done();
  });
});

afterAll(async (done) => {
  done();
});
