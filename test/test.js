process.env.NODE_ENV = 'test';

//dev dependecies
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json');
const server = require('../server/index.js');
let should = chai.should();
const expect = chai.expect;
var assert = require('assert');

chai.use(chaiHttp);

const RECIPE_ID = '5d0eda1fc191272ec02e78bf';

describe('GET /recipes', function() {
  this.timeout(3000);

  it('/api/should return the amount of recipes given by the limit', function(done) {
    chai.request(server)
    .get('/recipes?page=1&limit=5')
    .end( (err, res) => {
      expect(res.body).to.have.own.property("recipes");
      done();
    })
  });

  it('/api/should return single recipe', function(done) {
    chai.request(server)
    .get(`/recipes/recipe/${RECIPE_ID}`)
    .end( (err, res) => {
      expect(res.body).to.have.own.property("label");
      expect(res.body).to.have.own.property("image");
      expect(res.body).to.have.own.property("description");
      expect(res.body).to.have.own.property("ingredients");
      expect(res.body).to.have.own.property("directions");
      expect(res.body).to.have.own.property("description");
      expect(res.body).to.have.own.property("prepTime");
      expect(res.body).to.have.own.property("servings");
      expect(res.body).to.have.own.property("source");
      done();
    })
  });

  it('/api/should return searched recipes', function(done) {
    chai.request(server)
    .get('/recipes/search/')
    .set('tags', 'File Gumbo')
    .end( (err, res) => {
      expect(200)
      done();
    })
  });
});
