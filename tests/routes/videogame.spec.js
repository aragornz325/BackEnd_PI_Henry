const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
          name: 'ark survival envolved',
          description: "el de los dinosuarios qe juega maximo",
          image: "img",
          rating:2,
          released: "2005.12.01",
          platforms: ['xbox', 'playstation 3' ],
          createdInDb: true,
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  
  });
describe("**RUTAS VIDEOGAMES**", () => {
  describe("GET /api/videogame/{idVideogame}", () => {
    it("should get 200", () => agent.get("/api/videogame/3498").expect(200));
  });
  describe("GET /api/genres", () => {
    it("should get 200", () => agent.get("/api/genres").expect(200));
  });
  describe("POST /api/videogame", () => {
    it("should get 200", () =>
      agent.post("/api/videogame").send(videogame).expect(200));
  });
});

