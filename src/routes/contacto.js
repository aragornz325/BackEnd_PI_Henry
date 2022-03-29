require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Contacto } = require("../db");
const { transporter } = require('../services/nodemailerGmail')


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

      let interno = await transporter.sendMail({
        from: `mensaje de ${nombre} ${apellido} desde ${email}`, 
        to: "rodrigo.m.quintero@gmail.com", 
        subject: "Nuevo conctacto de game Stack", 
        text: `desde la web`, 
        html: `<b>${mensaje}</b>`, 
      });

      let devolucion = await transporter.sendMail({
        from: 'confirmacion Game Stack', 
        to: `${email}`, 
        subject: "recibimos su mensaje", 
        text: `hemos recibido su mensaje, nos pondremos en contacto con usted a la brevedad posible!`, 
        html: "<b>hemos recibido su mensaje, nos pondremos en contacto con usted a la brevedad posible!, muchas gracias!</b>", 
      });


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