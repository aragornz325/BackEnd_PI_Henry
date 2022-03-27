const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");
const { YOUR_API_KEY } = process.env;
const router = Router();
const { pageMap } = require('./utils/functions')


router.get("/", async (req, res) => {
  try {
    let videogames = [];
    let { name } = req.query;

    if (name) {
      let dbVideogame = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }, 
        },  
        attributes: {
          exclude: ["createdAt", "updatedAt"] 
        },
        include: {
          model: Genres,
          as: "genres",
          attributes:["name", "id"],
          through: { attributes: [] },
          }
      })
      let resp = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`
      );
      for (let i = 0; i < 15; i++) {
        if (resp.data.results[i]) {
          videogames.push(resp.data.results[i]);
        }
      }
      let videogamesMap = videogames.map((e) =>{
        return pageMap(e)
      })
      let vgToSend = dbVideogame.concat(videogamesMap).slice(0, 15);
      res.send(vgToSend);
    } 
    
    else 
    
    {
      let resp = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)

      let respLimited = resp.data.results;

      respLimited.map((e) => {
        let p1 = pageMap(e);
        return videogames.push(p1);
      });

      const resp2 = await axios.get(resp.data.next);
      let respLimited2 = resp2.data.results;

      respLimited2.map((e) => {
        let p2 = pageMap(e)
        return videogames.push(p2);
      });

      const resp3 = await axios.get(resp2.data.next);
      let respLimited3 = resp3.data.results;
      respLimited3.map((e) => {
        let p3 = pageMap(e);
        return videogames.push(p3);
      });

      const resp4 = await axios.get(resp3.data.next);
      let respLimited4 = resp4.data.results;
      respLimited4.map((e) => {
        let p4 = pageMap(e)
        return videogames.push(p4);
      });

      const resp5 = await axios.get(resp4.data.next);
      let respLimited5 = resp5.data.results;
      respLimited5.map((e) => {
        let p5 = pageMap(e);
        return videogames.push(p5);
      });

      let dbVg = await Videogame.findAll({
        attributes:{
          exclude: ["updatedAt", "createdAt"]
        },
        include: {
        model: Genres,
        as: "genres",
        attributes:["name", "id"],
        through: { attributes: [] },
        }
      });

      videogames.sort(function(a,b) {
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0
      })

      const vgConcatenated = dbVg.concat(videogames);
      const esteladohaciaelenemigo = vgConcatenated?.slice(0,100)
      
      console.log('cantidad de juegos enviados al front---->', esteladohaciaelenemigo.length)
      res.json(esteladohaciaelenemigo);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;