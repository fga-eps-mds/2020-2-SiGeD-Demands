const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  // Saving categories ids to use when create demands constants
  let category_id;

  // Categories test comes first.

  // Categories values:
  const category = {
    name: 'Nome da Categoria',
    description: 'Descrição da Demanda',
    color: '#000000'
  };

  const category2 = {
    name: 'Nome da Categoria 2',
    description: 'segunda categoria',
    color: '#ff0000'
  };

  // token declaration:
  const token = jwt.sign({
    name: "Teste",
    description: "Teste",
    process: '000000',
    categoryID: ['000000'],
    sectorID: '000000',
    clientID: '000000',
    userID: '000000'
  }, process.env.SECRET, {
    expiresIn: 240,
  });


  // Test API:
  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Post category', async (done) => {
    const res = await request(app).post('/category/create').set('x-access-token', token).send(category);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(category.name);
    expect(res.body.description).toBe(category.description);
    expect(res.body.color).toBe(category.color);
    category_id = res.body._id;
    done();
  });

  it('Post category 2', async (done) => {
    const res = await request(app).post('/category/create').set('x-access-token', token).send(category2);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(category2.name);
    expect(res.body.description).toBe(category2.description);
    expect(res.body.color).toBe(category2.color);
    category_id2 = res.body._id;
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
    expect(res.body.status).toEqual(['invalid name']);
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

  it('Update category without token', async () => {
    const category = {
      name: "Jest test",
      description: "Jest description",
      color: "#000000"
    }
    const res = await request(app)
      .put(`/category/update/${category_id}`)
      .send(category);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, errorCode: 401, message: 'No token was provided' });
  });

  it('Update category with invalid token', async () => {
    const tokenFalho = 'abc123';
    const category = {
      name: "Jest test",
      description: "Jest description",
      color: "#000000"
    }
    const res = await request(app)
      .put(`/category/update/${category_id}`)
      .set('x-access-token', tokenFalho)
      .send(category);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'It was not possible to authenticate the token.' });
  });

  // Demands tests

  // Demands constants
  let id;
  let falseId;
  const demand = {
    name: 'Nome da Demanda',
    description: 'Descrição da Demanda',
    process: '000000',
    categoryID: ['6070b70835599b005b48b32d', '6070b71635599b005b48b32e'],
    sectorID: '6064ffa9942d5e008c0734dc',
    clientID: '6054dacb934bd000d7ca623b',
    userID: '60578028cb9349004580fb8d'
  };
  const falseDemand = {
    name: 'Nome da Demanda',
    description: 'Descrição da Demanda',
    process: '000000',
    categoryID: ['6070b70835599b005b48b32d', '6070b71635599b005b48b32e'],
    sectorID: '6064ffa9942d5e008c0734dc',
    clientID: '6054dacb934bd000d7ca623b',
    userID: '60578028cb9349004580fb8d',
  };
  const updatedSectorID = {
    sectorID: 'TESTE'
  };
  const forwardSectorID = {
    sectorID: 'TESTE 2'
  };

  it('Post demand', async (done) => {
    const res = await request(app).post('/demand/create').set('x-access-token', token).send(demand);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(demand.name);
    expect(res.body.description).toBe(demand.description);
    expect(res.body.process).toBe(demand.process);
    expect(res.body.sectorHistory[0].sectorID).toBe(demand.sectorID);
    expect(res.body.clientID).toBe(demand.clientID);
    expect(res.body.userID).toBe(demand.userID);
    id = res.body._id;
    done();
  });

  it('Post closed demand', async (done) => {
    const res = await request(app).post('/demand/create').set('x-access-token', token).send(falseDemand);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(falseDemand.name);
    expect(res.body.description).toBe(falseDemand.description);
    expect(res.body.process).toBe(falseDemand.process);
    expect(res.body.sectorHistory[0].sectorID).toBe(falseDemand.sectorID);
    expect(res.body.clientID).toBe(falseDemand.clientID);
    expect(res.body.userID).toBe(falseDemand.userID);
    falseId = res.body._id;
    done();
  });

  it('Post demand error', async (done) => {
    const errorDemand = {
      name: '',
      description: '',
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
      'invalid category id',
      'invalid sector id',
      'invalid client id',
      'invalid user id'
    ]);
    done();
  });

  it('Get demand', async (done) => {
    const res = await request(app).get('/demand/').set('x-access-token', token);
    expect(res.body[0].name).toBe(demand.name);
    expect(res.body[0].clientID).toBe(demand.clientID);
    expect(res.body[0].process).toBe(demand.process);
    expect(res.body[0].sectorHistory[0].sectorID).toBe(demand.sectorID);
    expect(res.body[0].userID).toBe(demand.userID);
    expect(res.body[0].description).toBe(demand.description);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Get demand', async (done) => {
    const res = await request(app).get('/demand/?open=true').set('x-access-token', token);
    expect(res.body[0].name).toBe(demand.name);
    expect(res.body[0].process).toBe(demand.process);
    expect(res.body[0].clientID).toBe(demand.clientID);
    expect(res.body[0].sectorHistory[0].sectorID).toBe(demand.sectorID);
    expect(res.body[0].description).toBe(demand.description);
    expect(res.body[0].userID).toBe(demand.userID);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Get id demand', async (done) => {
    const res = await request(app).get(`/demand/${id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(demand.name);
    expect(res.body.description).toBe(demand.description);
    expect(res.body.process).toBe(demand.process);
    expect(res.body.sectorHistory[0].sectorID).toBe(demand.sectorID);
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

  // Need to close demand before trying to get closed demands, same goes for getting opened demands
  it('Close/Open demand', async (done) => {
    const res = await request(app).put(`/demand/toggle/${falseId}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(falseDemand.name);
    expect(res.body.clientID).toBe(falseDemand.clientID);
    expect(res.body.process).toBe(falseDemand.process);
    expect(res.body.sectorHistory[0].sectorID).toBe(falseDemand.sectorID);
    expect(res.body.userID).toBe(falseDemand.userID);
    expect(res.body.description).toBe(falseDemand.description);
    done();
  });

  // Back to getting demands
  it('Get closed demand', async (done) => {
    const res = await request(app).get('/demand?open=false').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe(falseDemand.name);
    expect(res.body[0].clientID).toBe(falseDemand.clientID);
    expect(res.body[0].process).toBe(falseDemand.process);
    expect(res.body[0].sectorHistory[0].sectorID).toBe(falseDemand.sectorID);
    expect(res.body[0].userID).toBe(falseDemand.userID);
    expect(res.body[0].description).toBe(falseDemand.description);
    expect(res.body[0].open).toBe(false);
    done();
  });

  it('toggle demand error', async (done) => {
    const res = await request(app).put('/demand/toggle/123456789').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

  it('Update demand', async () => {
    const demandUpdate = {
      name: 'Retirada de Documento',
      description: 'Retirar documento na DPSS',
      process: '4005',
      categoryID: ['6064ffa9942d5e008c07e61a'],
      sectorID: 'sectorID',
      clientID: 'clientID',
      userID: 'userID'
    };
    const res = await request(app).put(`/demand/update/${id}`).set('x-access-token', token).send(demandUpdate);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(demandUpdate.name);
    expect(res.body.process).toBe(demandUpdate.process);
    expect(res.body.description).toBe(demandUpdate.description);
    expect(res.body.userID).toBe(demandUpdate.userID);
    expect(res.body.clientID).toBe(demandUpdate.clientID);
  });

  // Testing each error message
  it('Update demand error name', async () => {
    const demand1 = {
      name: '',
      process: '4005',
      description: 'Retirar documento na DPSS',
      userID: 'userID',
      categoryID: 'categoryID',
      clientID: 'clientID',
      sectorID: 'sectorID'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand1);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid name']);
  });

  it('Update demand error description', async () => {
    const demand2 = {
      name: 'Retirada de documento',
      categoryID: 'categoryID',
      description: '',
      sectorID: 'sectorID',
      userID: 'userID',
      clientID: 'clientID',
      process: '4005'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand2);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid description']);
  });

  it('Update demand error category', async () => {
    const demand4 = {
      categoryID: '',
      description: 'Retirar documento na DPSS',
      sectorID: 'sectorID',
      userID: 'userID',
      process: '4005',
      clientID: 'clientID',
      name: 'Retirada de documento'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand4);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid category id']);
  });

  it('Update demand error sector', async () => {
    const demand5 = {
      sectorID: '',
      name: 'Retirada de documento',
      clientID: 'clientID',
      categoryID: 'categoryID',
      description: 'Retirar documento na DPSS',
      process: '4005',
      userID: 'userID'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand5);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid sector id']);
  });

  it('Update demand error client', async () => {
    const demand6 = {
      categoryID: 'categoryID',
      name: 'Retirada de documento',
      sectorID: 'sectorID',
      process: '4005',
      description: 'Retirar documento na DPSS',
      clientID: '',
      userID: 'userID',
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand6);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid client id']);
  });

  it('Update demand error user', async () => {
    const demand7 = {
      userID: '',
      name: 'Retirada de documento',
      categoryID: 'categoryID',
      description: 'Retirar documento na DPSS',
      clientID: 'clientID',
      sectorID: 'sectorID',
      process: '4005'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', token)
      .send(demand7);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid user id']);
  });

  it('Update with invalid id', async () => {
    const demand8 = {
      name: 'Retirada de arma',
      categoryID: 'IDcategory',
      sectorID: 'IDsector',
      userID: 'IDuser',
      description: 'Retirar token',
      clientID: 'IDclient',
      process: '504'
    };

    const res = await request(app)
      .put(`/demand/update/123abc`)
      .set('x-access-token', token)
      .send(demand8)
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe('invalid id')
  });

  it('Update demand without token', async () => {
    const demand = {
      userID: 'IDuser',
      sectorID: 'IDsector',
      categoryID: 'IDcategory',
      description: 'Retirar token',
      process: '504',
      clientID: 'IDclient',
      name: 'Retirada de token'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .send(demand);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, errorCode: 401, message: 'No token was provided' });
  });

  it('Update demand with invalid token', async () => {
    const tokenFalho = 'abc123';
    const demand = {
      userID: '839589v4c8984',
      sectorID: 'jkncjh8e7c8nc4819c',
      categoryID: 'cewdu8eu8eceh882em21',
      description: 'Teste',
      process: '907',
      clientID: 'bdheduhdhu29ue8de',
      name: 'Retirada de teste'
    }

    const res = await request(app)
      .put(`/demand/update/${id}`)
      .set('x-access-token', tokenFalho)
      .send(demand);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'It was not possible to authenticate the token.' });
  });

  it('Update Demand Sector', async (done) => {
    const res = await request(app).put(`/demand/sectorupdate/${id}`).set('x-access-token', token).send(updatedSectorID);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Retirada de Documento');
    expect(res.body.clientID).toBe('clientID');
    expect(res.body.process).toBe('4005');
    expect(res.body.sectorHistory[0].sectorID).toBe(updatedSectorID.sectorID);
    expect(res.body.userID).toBe('userID');
    expect(res.body.description).toBe('Retirar documento na DPSS');
    done();
  });
  it('Update Demand Sector error', async (done) => {
    const updatedSectorID = {
      sectorID: ''
    };
    const res = await request(app).put(`/demand/sectorupdate/${id}`).set('x-access-token', token).send(updatedSectorID);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid sectorID']);
    done();
  });
  it('Update Demand Sector ID error', async (done) => {
    const res = await request(app).put(`/demand/sectorupdate/123`).set('x-access-token', token).send(updatedSectorID);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toEqual('Invalid ID');
    done();
  });
  it('Forward Demand', async (done) => {
    const res = await request(app).put(`/demand/forward/${id}`).set('x-access-token', token).send(forwardSectorID);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Retirada de Documento');
    expect(res.body.clientID).toBe('clientID');
    expect(res.body.process).toBe('4005');
    expect(res.body.sectorHistory[0].sectorID).toBe(updatedSectorID.sectorID);
    expect(res.body.sectorHistory[1].sectorID).toBe(forwardSectorID.sectorID);
    expect(res.body.userID).toBe('userID');
    expect(res.body.description).toBe('Retirar documento na DPSS');
    done();
  });
  it('Forward Demand error', async (done) => {
    const forwardSectorID = {
      sectorID: ''
    };
    const res = await request(app).put(`/demand/forward/${id}`).set('x-access-token', token).send(forwardSectorID);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid sectorID']);
    done();
  });
  it('Forward Demand ID error', async (done) => {
    const forwardSectorWrong = {
      sectorID: '2343'
    };
    const res = await request(app).put(`/demand/forward/123`).set('x-access-token', token).send(forwardSectorWrong);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toEqual('Invalid ID');
    done();
  });
  it('Create Demand Update', async (done) => {
    const demandUpdate = {
      userName: "Nome do usuário",
      userSector: demand.userID,
      description: "Descrição da Atualização de Demanda",
      visibilityRestriction: true,
    };
    const res = await request(app).put(`/demand/create-demand-update/${id}`).set('x-access-token', token).send(demandUpdate);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Retirada de Documento');
    expect(res.body.clientID).toBe('clientID');
    expect(res.body.process).toBe('4005');
    expect(res.body.sectorHistory[0].sectorID).toBe(updatedSectorID.sectorID);
    expect(res.body.sectorHistory[1].sectorID).toBe(forwardSectorID.sectorID);
    expect(res.body.userID).toBe('userID');
    expect(res.body.description).toBe('Retirar documento na DPSS');
    expect(res.body.updateList[0].userName).toBe(demandUpdate.userName);
    expect(res.body.updateList[0].userSector).toBe(demandUpdate.userSector);
    expect(res.body.updateList[0].description).toBe(demandUpdate.description);
    expect(res.body.updateList[0].visibilityRestriction).toBe(demandUpdate.visibilityRestriction);
    done();
  });
  it('Create Demand Update userName error', async (done) => {
    const userNameError = {
      userName: "",
      userSector: demand.userID,
      description: "Descrição da Atualização de Demanda",
      visibilityRestriction: true,
    };
    const res = await request(app).put(`/demand/create-demand-update/${id}`).set('x-access-token', token).send(userNameError);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid userName']);
    done();
  });
  it('Create Demand Update description error', async (done) => {
    const descriptionError = {
      userName: "Nome do Usuário",
      userSector: demand.userID,
      description: "",
      visibilityRestriction: true,
    };
    const res = await request(app).put(`/demand/create-demand-update/${id}`).set('x-access-token', token).send(descriptionError);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid description']);
    done();
  });
  it('Create Demand Update visibilityRestriction error', async (done) => {
    const visibilityRestrictionError = {
      userName: "Nome do Usuário",
      userSector: demand.userID,
      description: "Descrição da Atualização de Demanda",
      visibilityRestriction: "",
    };
    const res = await request(app).put(`/demand/create-demand-update/${id}`).set('x-access-token', token).send(visibilityRestrictionError);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid visibilityRestriction']);
    done();
  });
  it('Create Demand Update sectorID error', async (done) => {
    const sectorIDError = {
      userName: "Nome do Usuário",
      description: "Descrição da Atualização de Demanda",
      visibilityRestriction: true,
      userSector: ""
    };
    const res = await request(app).put(`/demand/create-demand-update/${id}`).set('x-access-token', token).send(sectorIDError);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid sector']);
    done();
  });
  it('Create Demand Update ID error', async (done) => {
    const demandUpdateIDError = {
      userName: "Usuário X",
      description: "Descrição Teste",
      visibilityRestriction: true,
      userSector: demand.userID,
    };
    const res = await request(app).put(`/demand/create-demand-update/123`).set('x-access-token', token).send(demandUpdateIDError);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toEqual('Invalid ID');
    done();
  });

  // Delete category tests comes for last, that's important
  it('Delete category', async (done) => {
    const res = await request(app).delete(`/category/delete/${category_id}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ "message": "success" });
    done();
  });
  it('Delete category error', async (done) => {
    const res = await request(app).delete('/category/delete/09876543210987654321').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "failure" });
    done();
  });
});
afterAll(async (done) => {
  done();
});
