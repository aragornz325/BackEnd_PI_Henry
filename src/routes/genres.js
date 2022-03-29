require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Genres } = require("../db");

const findGenres = async () => {
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
        const genresMap = allGenres.data.results.map((e) => {
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
  
  router.get("/", async (req, res) => {
    const {genres} = await findGenres();
    res.json(genres);
  });

  module.exports = router;






  // fetch(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    // .then((response) => response.json())
    // .then((data) => {
    //   const genresMap = data.results.map((e) => {
    //     return {
    //       id: e.id,
    //       name: e.name,
    //     };
    //   });
    //   genresMap.map(async (e) => {
    //     await Genres.findOrCreate({
    //       where: {
    //         id: e.id,
    //         name: e.name,
    //       },
    //     });
    //   });
    //   return {
    //     genres: genresMap,
    //   };
    // })
    // .catch((error) => {
    //   console.log("Genres not found", error);
    // }) 
    

//     axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
//     .then((response) => {
//       const genresMap = response.data.results.map((e) => {
//             return {
//               id: e.id,
//               name: e.name,
//             };
//           });
//           genresMap.map(async (e) => {
//             await Genres.findOrCreate({
//               where: {
//                 id: e.id,
//                 name: e.name,
//               },
//             });
//           });
//           return {
//             genres: genresMap,
//           };
//     })
//     .catch((error) => {
//       console.log("Genres not found", error);
//     }) 
//   } else {
//     return {
//       genres: table,
//     };
//   }