const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");
const { YOUR_API_KEY } = process.env;
const router = Router();
const { pageMap } = require('./utils/functions')


router.get("/", async (req, res) => {
 
    let videogames = [];
    let { name } = req.query;

    if (name) {
      console.log(`--------me llego ${name}, te lo busco----------`)
    try { let dbVideogame = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.query}%`
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
        
      } catch(error) {
        console.log(error)
        
      }

    } else {
      console.log('----------rstoy en el else te traigo todos-------------')
      try {
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
       
        
        
        let resp = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
          
        
        let respLimited = resp.data.results;
  
        respLimited.map((e) => {
          let p1 = pageMap(e);
          return videogames.push(p1);
        });
        let paginas =0
          while(paginas < 5) {
            paginas ++
             const whileado = await axios.get(resp.data.next);
             //const mapwhileado = whileado
             whileado.map((e) => {
              let p = pageMap(e)
              return videogames.push(p);
            });
          }

        
  
        
        const vgConcatenated = dbVg.concat(videogames);
        res.json(vgConcatenated);
        
      } catch(error) {
        console.log(error)
      }
    }
  
});

module.exports = router;