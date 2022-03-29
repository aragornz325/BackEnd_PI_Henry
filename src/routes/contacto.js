require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Contacto } = require("../db");


router.post('/', async (req, res) => {
    console.log('---------entre a post, voy a guardar un contacto---------')
    
    try {
      let {
        nombre,
        apellido,
        email,
        direpost,
        mensaje,
        
      } = req.body
      console.log(req.body)
      let guardarContacto = await Contacto.create({
        nombre, 
        apellido,
        email,
        direpost,
        mensaje,
        })

      res.send("se guardo info de contacto");
    } catch(error) {
      console.log({error})
      res.status(406).json("error al guardar")
    }
    
    
  })

  module.exports = router;