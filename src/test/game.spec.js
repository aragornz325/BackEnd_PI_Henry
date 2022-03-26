const { expect } = require('chai');
const { agent } = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
    name: "ark", 
}

describe('routa de los videojuegos', () => {
    before(()=>conn.authenticate()
    .catch((err)=>{
        console.error('no se conecto la base de datos', err)
    }));
})