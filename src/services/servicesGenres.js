require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Genres } = require("../db");




const findGenres = async () => {
    console.log('------------estoy buscando los generos--------------')
      const table = await Genres.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!table.length) {
        try {
          const allGenres = await axios.get(
            `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
          );
          const genresMap = allGenres.data.results.map((e) => { /* la data me llega un nivel mas abajo */
            return {
              id: e.id,
              name: e.name,
            };
          });
          genresMap.map(async (e) => {
            await Genres.findOrCreate({
              where: {
                id: e.id,
                name: e.name,
              },
            });
          });
          return {
            genres: genresMap,
          };
        } catch (error) {
          console.log("Genres not found");
        }
      } else {
        return {
          genres: table,
        };
      }
    };


    module.exports = findGenres