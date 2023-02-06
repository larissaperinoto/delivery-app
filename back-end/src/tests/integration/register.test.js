const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { User } = require('../../database/models');
const { userMock, tokenMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa a rota /register', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /register', () => {
    it('Usuário consegue se registrar com sucesso', async () => {
      sinon.stub(User, "findOne").resolves(undefined);
      sinon.stub(User, "create").resolves({});

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ message: 'Created' });
    });

    it('Usuário tenta se registrar com credenciais já cadastradas', async () => {
      sinon.stub(User, "findOne").resolves(userMock);

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal({ message: 'Conflict' });
    });
  });

  describe('Testa método POST na rota /register/seller', () => {
    it('Admin consegue registrar um vendedor com sucesso', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves(userMock);
      sinon.stub(User, "findOne").resolves(undefined);
      sinon.stub(User, "create").resolves({});

      const response = await chai
              .request(app)
              .post('/register/seller')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              })
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ message: 'Created' });
    });

    it('Não é possível cadastrar um vendedor com credenciais já registradas', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves(userMock);
      sinon.stub(User, "findOne").resolves(userMock);

      const response = await chai
              .request(app)
              .post('/register/seller')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              })
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal({ message: 'Conflict' });
    });
  });

  describe('Testa método GET na rota /users', () => {
    it('É possível buscar por todas as pessoas cadastradas', async () => {
      sinon.stub(User, "findAll").resolves([userMock]);

      const response = await chai
              .request(app)
              .get('/users')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([userMock]);
    });
  });
});
