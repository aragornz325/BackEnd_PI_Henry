const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
        Videogame.create({description: 'un juego de plataforma que todos conocemos'})
        Videogame.create({plataforms: 'xbox'})
      });
      it('should work when its a valid description', () => {
        Videogame.create({description: 'un juego de plataforma que todos conocemos'})
        Videogame.create({plataforms: 'xbox'})
      });
      it('should work when its a valid plataform', () => {
        Videogame.create({plataforms: 'xbox'})
      });
    });
  });
});
